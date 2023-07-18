import { useNavigate, useSearchParams } from "react-router-dom";
import useSearchModal from "../../Hooks/useSearchModal";
import Modal from "./Modal";
import { lazy, useCallback, useMemo, useState } from "react";
import {  Range } from "react-date-range";
// import Map from "../Map";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../Listings/Calendar";
import Counter from "../Inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const Map = lazy(() => import('../Map'));

  const searchModal = useSearchModal();
  const navigate = useNavigate();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const OnNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return OnNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
      };

      if(dateRange.startDate){
        updatedQuery.startDate = formatISO(dateRange.startDate)
      }
      if(dateRange.endDate){
        updatedQuery.endDate = formatISO(dateRange.endDate)
      }

      const url = qs.stringifyUrl({
        url: "/",
        query: updatedQuery
      }, {skipNull: true})

      setStep(STEPS.LOCATION)
      searchModal.onClose()
      navigate(url)
    
  }, [step, searchModal, location, navigate, bathroomCount, roomCount, guestCount, OnNext, dateRange, params]);

  const actionLabel = useMemo(() => {
    if(step === STEPS.INFO){
        return "Search"
    }
    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.LOCATION){
        return undefined
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading title="Where do you wanna go?" subtitle="Find the perfect location" />
        <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue) } />
        <hr/>
        <Map  center={location?.latlng}/>
    </div>
  )

  if(step === STEPS.DATE){
    bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subtitle="Make sre everyone is free" />
        <Calender value={dateRange} onChange={(value) => setDateRange(value.selection)} />
        </div>
    )
  }

  if(step === STEPS.INFO){
    bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter title="Guests" subtitle="How many guests are comming?" value={guestCount} onChange={(value) => setGuestCount(value)} />
        <Counter title="Room" subtitle="How many rooms do you need?" value={roomCount} onChange={(value) => setRoomCount(value)} />
        <Counter title="Bathrooms" subtitle="How many bathrooms do you need?" value={bathroomCount} onChange={(value) => setBathroomCount(value)} />
        </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default SearchModal;
