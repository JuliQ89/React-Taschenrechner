import { RiErrorWarningFill } from "@remixicon/react";

const ErrorMsg = ({ errors }) => {
  return (
    <>
        {errors.length > 0 && (
        <ul className="taschenrechnerErrorMsgList">
            {errors.map(err => (
                <li key={err}><RiErrorWarningFill />{ err }</li>
            ))}
        </ul>
        )}
    </>
  )
}

export default ErrorMsg