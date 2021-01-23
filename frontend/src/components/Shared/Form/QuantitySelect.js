import { FormControl, Select } from '@chakra-ui/react'

const QuantitySelect = ({ qty, handleChange, product }) => {
  return (
    <FormControl>
      <Select value={qty} onChange={handleChange}>
        {[...Array(product?.stockCount).keys()].map((o) => (
          <option key={o + 1} value={o + 1}>
            {o + 1}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default QuantitySelect
