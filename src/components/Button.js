const Button = ({ value, style, handleClick, name }) => {
    return (
        <button name={name} value={value} onClick={handleClick} className={`bg-gray-200 p-5 border border-gray-50 cursor-pointer ${style}`}>{value}</button>
    )
}

export default Button