import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useState } from "react";

export const PaginationItem = ({
  children,
  disabled,
  isActive,
}: {
  children: any;
  disabled?: boolean;
  isActive?: boolean;
}) => {
  return (
    <motion.div
      whileHover={!disabled && !isActive ? { y: -10 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group"
    >
      <Button
        aria-disabled={disabled}
        className={`${isActive ? "bg-slate-700 text-white" : "bg-white/60 text-gray-700"}  group-aria-[disabled=false]-hover:bg-gray-600 aria-disabled:bg-gray-400 group-aria-[disabled=false]-hover:text-white p-2 border-[1px] border-solid border-gray-400 hover:bg-black rounded-full h-10 w-10   hover:bg-gray-100/80 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed`}
      >
        {children}
      </Button>
    </motion.div>
  );
};
