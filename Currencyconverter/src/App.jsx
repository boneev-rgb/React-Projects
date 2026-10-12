import { useState } from 'react'
import { Input } from './components'
import usecurrencyinfo from './hooks/usecurrencyinfo'
import './App.css'


function App() {
    
    const[amount,setAmount]=useState(0)
    const[from,setFrom]=useState("inr")
    const[to,setTo]=useState("usd")
    const[convertedamount,setConvertedAmount]=useState(0)

    const currencyinfo = usecurrencyinfo(from)
    const options = Object.keys(currencyinfo)
    const swap =()=>{
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedamount)
    }

    const convert = () => {
    setConvertedAmount(amount * currencyinfo[to.toLowerCase()])
    }



  return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://imgs.search.brave.com/-XWHk09BNgCMX8D7Zs2Thn1OY1HAkrfhqOtJ8aFTdxo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE3LzcxLzk4Lzk4/LzM2MF9GXzE3NzE5/ODk4NjFfRktOWERM/bUtubk5vMklQdWxH/TjFEUFRGbnBVSzFU/OHUuanBn')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <Input 
                                label="From"
                                amount={amount}
                                currencyoptions={options}
                                onCurrencyChange={(currency)=>setFrom(currency)} 
                                selectCurrency={from}
                                onAmountChange={(amount)=>setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1  mb-4">
                            <Input
                                label="To"
                                amount={convertedamount}
                                currencyoptions={options}
                                onCurrencyChange={(currency)=>setTo(currency)} 
                                selectCurrency={to}
                                
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
