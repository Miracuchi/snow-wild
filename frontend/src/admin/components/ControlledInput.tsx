import { Input } from "@/components/ui/input";
import { useState } from "react"

const ControlledInput = ({initialValue = 0, field } : {initialValue: number, field: any}) => {

  const [value, setValue] = useState<number>(initialValue);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(Number(e.currentTarget.value)),
    field.onChange({
      size: field.value.size, 
      quantity: Number(e.currentTarget.value)
    })
  }

  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => {handleChange(e)}}
    />
  )
};

export default ControlledInput