const Button = ({ buttonText, classes, handleonClick }) => {
  return (
    <button 
        className={classes} 
        onClick={handleonClick}
    >
        { buttonText }
    </button>
  )
}

export default Button