import Button from "./components/Button";
import { useState } from 'react';


const App = () => {

  const [displayValue, setDisplayValue] = useState("")
  const [operation, setOperation] = useState({ operand1: "", operator: null, operand2: "" })
  const [results, setResults] = useState("")

  console.log("results", results)
  console.log("operation", operation)
  const selectOperator = (operator) => {
    setOperation(prevOperation => ({ ...prevOperation, operator: operator }))
    setDisplayValue("")
  }

  const selectOperand1 = (operand1) => {
    setOperation(prevOperation => ({ ...prevOperation, operand1: prevOperation.operand1 + operand1 }))
  }

  const selectOperand2 = (operand2) => {
    setOperation(prevOperation => ({ ...prevOperation, operand2: prevOperation.operand2 + operand2 }))
  }

  const handleChange = (newNumber) => {
    setDisplayValue(prevValue => prevValue + newNumber)
  }

  const handleClick = (event) => {
    if (event.target.value === "=") {
      setResults(calculate(+operation.operand1, +operation.operand2, operation.operator))
      setDisplayValue(calculate(+operation.operand1, +operation.operand2, operation.operator))
    }

    else if (["+", "-", "*", "/"].includes(event.target.value)) {
      selectOperator(event.target.value)
    }

    else if (event.target.value === 'AC') {
      if (results !== "") {
        setResults("");
        setOperation({ operand1: "", operator: null, operand2: "" });
        setDisplayValue("")
      }
      else if (operation.operand1 && operation.operator) {
        setOperation(prevOperation => ({ ...prevOperation, operand2: "" }))
        setDisplayValue("")
      }
      else {
        setOperation(prevOperation => ({ ...prevOperation, operand1: '' }))
        setDisplayValue("")
      }

    }

    else if (event.target.value === "%") {
      if (operation.operand1 && operation.operator) {
        setOperation(prevOperation => ({ ...prevOperation, operand2: prevOperation.operand2 / 100 }))
        setDisplayValue(operation.operand2 / 100)
      }
      else {
        setOperation(prevOperation => ({ ...prevOperation, operand1: prevOperation.operand1 / 100 }))
        setDisplayValue(operation.operand1 / 100)
      }
    }

    else if (event.target.value === "+/-") {

      if (operation.operand1 && operation.operator) {
        setOperation(prevOperation => ({ ...prevOperation, operand2: prevOperation.operand2 * -1 }))
        setDisplayValue(operation.operand2 * -1)
      }
      else {
        setOperation(prevOperation => ({ ...prevOperation, operand1: prevOperation.operand1 * -1 }))
        setDisplayValue(operation.operand1 * -1)
      }
    }
    else if (event.target.value === '0') {
      if (results !== "") {
        setResults("")
        setOperation({ operand1: "", operator: null, operand2: "" })
        selectOperand1(event.target.value)
        setDisplayValue("")
      }
      else if (operation.operand1 === "") {
        setDisplayValue("")
      }
      else {
        if (operation.operand2) {
          setOperation((prevOperation => ({ ...prevOperation, operand2: prevOperation.operand2 + event.target.value })))
          setDisplayValue(operation.operand2 + event.target.value)
        }
        else {
          setOperation((prevOperation => ({ ...prevOperation, operand1: prevOperation.operand1 + event.target.value })))
          setDisplayValue(operation.operand1 + event.target.value)
        }
      }
    }
    else {
      if (results !== "") {
        setResults("")
        setOperation({ operand1: "", operator: null, operand2: "" })
        selectOperand1(event.target.value)
        setDisplayValue("")
      }
      else if (operation.operand1 && operation.operator) {
        selectOperand2(event.target.value)

      }
      else {
        selectOperand1(event.target.value)

      }
      handleChange(event.target.value)
    }
  }





  const calculate = (num1, num2, operator) => {
    switch (operator) {
      case '+': return num1 + num2
      case '-': return num1 - num2
      case '*': return num1 * num2
      case '/': return num1 / num2
      default: return 0

    }
  }


  return (
    <div className="w-[300px] m-32">
      <input onChange={handleChange} placeholder="" value={displayValue} name="number" className="w-[300px] outline-none bg-gray-600 p-5 text-right placeholder:text-right placeholder:text-white  text-white" />
      <div className="grid grid-cols-4 gap-[3px]-">
        <Button value='AC' handleClick={handleClick} />
        <Button value='+/-' handleClick={handleClick} />
        <Button value='%' handleClick={handleClick} />
        <Button value='/' style={`${"bg-orange-500"}`} handleClick={handleClick} />
        <Button value='7' handleClick={handleClick} />
        <Button value='8' handleClick={handleClick} />
        <Button value='9' name='number' handleClick={handleClick} />
        <Button value='*' style={`${"bg-orange-500"}`} handleClick={handleClick} />
        <Button value='4' handleClick={handleClick} />
        <Button value='5' handleClick={handleClick} />
        <Button value='6' handleClick={handleClick} />
        <Button value='-' style={`${"bg-orange-500"}`} handleClick={handleClick} />
        <Button value='1' handleClick={handleClick} />
        <Button value='2' handleClick={handleClick} />
        <Button value='3' handleClick={handleClick} />
        <Button value='+' style={`${"bg-orange-500"}`} handleClick={handleClick} />
        <Button style={`${'col-span-2'}`} value='0' handleClick={handleClick} />
        <Button value='.' handleClick={handleClick} />
        <Button value='=' style={`${"bg-orange-500"}`} handleClick={handleClick} />

      </div>

    </div>
  )
}

export default App;