import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { calculateGainOrLoss } from '../utils/calculations';
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

type FormData = {
  ticker: string;
  buyPrice: number;
  sellPrice: number;
};

const CryptoTracker: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [result, setResult] = useState<number | null>(null);
  const [ticker, setTicker] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const onSubmit = (data: FormData) => {
    const calculationResult = calculateGainOrLoss(data.buyPrice, data.sellPrice);
    setResult(calculationResult);
    setTicker(data.ticker);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen flex-col ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <header className="p-5 flex items-center justify-between max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex items-center"
        >
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded transition-all ease-in-out duration-500 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 4
          }}
        >
          <SocialIcon
            target={"_blank"}
            url={"https://twitter.com/ursisterbtw"}
            fgColor={darkMode ? "white" : "gray"}
            bgColor="transparent"
            style={{ width: 48, height: 48 }}
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded transition-all ease-in-out duration-500 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 4
          }}
        >
          <SocialIcon
            target={"_blank"}
            url={"https://github.com/ursisterbtw"}
            fgColor={darkMode ? "white" : "gray"}
            bgColor="transparent"
            style={{ width: 48, height: 48 }}
          />
        </motion.button>

        <div className="mx-4">
          <Image src="/gen970.png" alt="Logo" width={60} height={60} />
        </div>

        <h1
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-500"
          }`}
        >
          ursister's pnl calculatoor
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded transition-all ease-in-out duration-500 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
          onClick={toggleDarkMode}
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 4
          }}
        >
          {darkMode ? (
            <MdLightMode
              style={{ width: 24, height: 24 }}
              className={`text-white`}
            />
          ) : (
            <MdDarkMode
              style={{ width: 24, height: 24 }}
              className={`text-gray-500`}
            />
          )}
        </motion.button>
      </motion.div>
    </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-6 border-2 border-green-700 rounded-lg shadow-lg transition-all ease-in-out duration-500 hover:border-green-500 hover:shadow-2xl ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        <div className="mb-4">
          <label className="text-center block mb-2">ticker</label>
          <input {...register('ticker')} required className={`w-full px-3 py-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`} />
        </div>
        <div className="mb-4">
          <label className="text-center block mb-2">buy</label>
          <input {...register('buyPrice')} required className={`w-full px-3 py-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`} />
        </div>
        <div className="mb-4">
          <label className="text-center block mb-2">sell</label>
          <input {...register('sellPrice')} required className={`w-full px-3 py-2 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`} />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-green-700 text-white rounded hover:bg-green-500 transition-all ease-in-out duration-500">
          calculate
        </button>
      </form>
      {result !== null && ticker !== null && (
        <div className={`mt-4 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
          {result < 0 ? (
            <div className="flex justify-center mt-2">
              <Image src="/badstonks.png" alt="Bad stocks" width={200} height={200} />
            </div>
          ) : (
            <div className="flex justify-center">
              <Image src="/goodstonks.jpg" alt="Good stocks" width={200} height={200} />
            </div>
          )}
          <p className='mt-2'>your realized profit/loss on {ticker} is <span className={`${result < 0 ? 'text-red-500' : 'text-green-500'}`}>{result}%</span></p>
        </div>
      )}
    </div>
  );
};

export default CryptoTracker;