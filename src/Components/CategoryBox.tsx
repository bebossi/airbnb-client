import { useCallback } from "react"
import { IconType } from "react-icons"
import { useNavigate,  useSearchParams } from "react-router-dom"
import qs from "query-string"

interface CategoryBoxProps {
    icon: IconType,
    label: string
    selected: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({icon: Icon, label, selected}) => {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const handleCLick = useCallback(() => {
        let currentQuery: any = {}

        if(params){
           currentQuery = qs.parse(params.toString()) 
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if(params?.get("category") === label) { 
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery,
        }, {skipNull: true})
        console.log(url)
        navigate(url)
    }, [label, params, navigate])


  return (
    <div  onClick={handleCLick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
    ${selected ? "border-b-neutral-800 " : " border-transparent"}
    ${selected ? "text-neutral-800" : " text-neutral-500"}

    `}>
      <Icon size={26}/>
      <div className="font-md text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox
