"use client";

import { Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/language-provider";

export const RotateHint = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="mb-4"
        animate={{
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Smartphone className="h-10 w-10" />
      </motion.div>
      <p className="text-lg font-semibold">
        {t("rotateHint.line1")}
        <br />
        {t("rotateHint.line2")}
      </p>
    </motion.div>
  );
};
