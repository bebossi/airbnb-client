import { useMemo, useState } from "react"
import useRentModal from "../../Hooks/useRentModal"
import Modal from "./Modal"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const Rentmodal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return "Create"
        }

        return "Next"
    }, [])


  return (
    <Modal isOpen={rentModal.isOpen} title="Airbnb youy home" onClose={rentModal.onClose} onSubmit={rentModal.onClose} actionLabel="Submit" />
  )
}

export default Rentmodal
