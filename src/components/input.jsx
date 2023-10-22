import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

export default function Input({
  label,
  type,
  id,
  placeholder,
  validation,
  name,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <div>
      <div>
        <label htmlFor={id}>{label}</label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
      />
    </div>
  );
}

const InputError = ({ message }) => {
  return <motion.div className="text-red-500" {...framer_error}>{message}</motion.div>;
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
