import { useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [numcheck, isnumavailable] = useState(false)

  const numchange = () => {
    isnumavailable(prev => ~prev)
  }

  const [speccheck, isspecavailable] = useState(false)

  const specchange = () => {
    isspecavailable(prev => ~prev)
  }

  const passref = useRef(null)

  function generatepass(length) {
    let char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numcheck){
      char += "1234567890"
    }

    if(speccheck){
      char += "!@#$%%^&*()-+*/"
    }

    let password = " "

    for(let i = 0; i < length; i++){
      let index = Math.floor(Math.random() * char.length)
      password += char[index]
    }

    return password
  }

  // COPY FUNCTION ADDED
  const copytoclip = () => {
    passref.current.select()
    window.navigator.clipboard.writeText(passref.current.value)
  }

  useEffect(() => {
    generatepass(length)
  }, [length])

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">

        <div className="bg-purple-200 w-full max-w-2xl rounded-2xl shadow-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-purple-900 mb-8">
            Password Generator
          </h1>

          <div className="flex gap-3 mb-6">

            <input
              type="text"
              value={generatepass(length)}
              readOnly
              ref={passref}
              className="flex-1 bg-white border border-purple-300 rounded-lg px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              onClick={copytoclip}
            >
              Copy
            </button>

          </div>

          <div className="mb-6">

            <div className="flex justify-between mb-2">
              <label className="font-semibold text-purple-900">
                Password Length
              </label>

              <span className="font-bold text-purple-700">
                {length}
              </span>
            </div>

            <input
              type="range" name="Length" min={6} max={20} value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full accent-purple-600 cursor-pointer"
            />

            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>6</span>
              <span>20</span>
            </div>

          </div>

          <div className="flex gap-8">

            <label
              htmlFor="numbers"
              className="flex items-center gap-2 cursor-pointer font-medium text-gray-800"
            >
              <input
                type="checkbox"
                id="numbers"
                onChange={numchange}
                className="w-5 h-5 accent-purple-600 cursor-pointer"
              />
              Numbers
            </label>

            <label
              htmlFor="special"
              className="flex items-center gap-2 cursor-pointer font-medium text-gray-800"
            >
              <input
                type="checkbox"
                id="special"
                onChange={specchange}
                className="w-5 h-5 accent-purple-600 cursor-pointer"
              />
              Special Characters
            </label>

          </div>

        </div>

      </div>
    </>
  )
}

export default App