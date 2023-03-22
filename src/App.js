import Button from "./components/Button";
import { useState } from 'react';


const App = () => {
  const values = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="]

  const [displayValue, setDisplayValue] = useState("")

  const [operation, setOperation] = useState({ operand1: "", operator: null, operand2: "" })

  const [results, setResults] = useState("")

  const selectOperator = (operator) => {
    setOperation(prevOperation => ({ ...prevOperation, operator: operator }))
    setDisplayValue("")
  }

  const selectOperand1 = (operand1) => { setOperation(prevOperation => ({ ...prevOperation, operand1: prevOperation.operand1 + operand1 })) }

  const selectOperand2 = (operand2) => { setOperation(prevOperation => ({ ...prevOperation, operand2: prevOperation.operand2 + operand2 })) }

  const handleChange = (newNumber) => { setDisplayValue(prevValue => prevValue + newNumber) }

  const handleCalculate = () => { return calculate(+operation.operand1, +operation.operand2, operation.operator) }

  const clear = () => {
    setResults("")
    setDisplayValue("")
  }

  const handleClick = (event) => {
    if (event.target.value === "=") {
      setResults(handleCalculate)
      setDisplayValue(handleCalculate)
    }

    else if (["+", "-", "*", "/"].includes(event.target.value)) selectOperator(event.target.value)


    else if (event.target.value === 'AC') {
      if (results !== "") {
        clear()
        setOperation({ operand1: "", operator: null, operand2: "" });
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
        clear()
        setOperation({ operand1: "", operator: null, operand2: "" })
        selectOperand1(event.target.value)

      }
      else if (operation.operand1 === "") setDisplayValue("")

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
        clear()
        setOperation({ operand1: "", operator: null, operand2: "" })
        selectOperand1(event.target.value)

      }
      else if (operation.operand1 && operation.operator) selectOperand2(event.target.value)

      else selectOperand1(event.target.value)

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
      <div className="grid grid-cols-4">
        {values.map((item, index) => {
          return (
            <Button key={index} value={item} handleClick={handleClick} style={`${index === 3 || index === 7 || index === 11 || index === 15 || index === 18 ? "bg-orange-500" : ""} ${index === 16 ? "col-span-2" : ""}`} />
          )
        })}
      </div>
    </div>
  )
}

export default App;