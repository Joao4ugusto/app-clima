import React, { useState, useEffect } from 'react';

import axios from 'axios'
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdSnow
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind
} from 'react-icons/bs';

import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';


const API = '36fc09f29655f0a28669a7f214fb7aef';

const App = () => {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Giruá');
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const hanleSubmit = (e) => {
    console.log(inputValue)

    if (inputValue !== '') {
      setLocation(inputValue);
    }

    e.preventDefault();
  }

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`

    axios.get(url).then(res => {
      setData(res.data);
    })
  }, [location]);

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className='text-5x1 animate-spin' />
        </div>
      </div>
    );
  }

  let icon;
  console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case 'clouds':
      icon = <IoMdCloudy />
      break
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break
    case 'Rain':
      icon = <IoMdRainy />
      break
    case 'Clear':
      icon = <IoMdSunny />
      break
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />
      break
    case 'snow':
      icon = <IoMdSnow />
      break
    case 'thunderstorm':
      icon = <IoMdThunderstorm />
      break
  }

  const date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat
    bg-cover bg-center flex flex-col items-center justify-center
    px-4 lg:px-0'>
      <form className='h-16 bg-black/30 w-full max-w-[450px]
      rounded-full backdrop-blur-[32px] mb-8'>
        <div className='h-full relative flex items-center 
        justify-between p-2'>
          <input onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none
          placeholder:text-white text-white text-[15px]
          font-ligth pl-6 h-full' type={Text} placeholder='Procure sua city'></input>
          <button onClick={(e) => hanleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd]  w-20 h-12
          rounded-full flex justify-center items-center 
          transition'><IoMdSearch className='text-2xl text-white' /></button>
        </div>
      </form>

      <div className='w-full max-w-[450px] bg-black/20
      min-h-[584px] text-white backdrop-blur-[32px] 
      rounded-[32px] py-12 px-6'>
        <div className='flex items-center gap-x-5'>
          <div className='text-[87px]'>{icon}</div>
          <div>
            <div className='text-2xl font-semibold'>{data.name}
              , {data.sys.country}
            </div>
            <div>
              {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
            </div>

          </div>
        </div>

        <div className='my-20'>
          <div className='flex justify-center items-center'>
            <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>

            <div className='text-4xl'>
              <TbTemperatureCelsius />
            </div>
          </div>
        </div>

        <div className='max-w-[360px] mx-auto flex flex-col gap-y-6'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <div><BsEye /> </div>
              </div>
              <div>
                visibilidade{" "} <span className='ml-2'>{data.visibility / 1000}Km</span>
              </div>
            </div>

            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <div><BsThermometer /> </div>
              </div>
              <div className='flex'>
                Sensação <span className='flex ml-2'>{parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius />
                </span>
              </div>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <div><BsWater /> </div>
              </div>
              <div>
                Umidade <span className='ml-2'>{data.main.humidity}%</span>
              </div>
            </div>

            <div className='flex items-center gap-x-2'>
              <div className='text-[20px]'>
                <div><BsWind /> </div>
              </div>
              <div>
                Vento <span className='ml-2'>{data.wind.speed} m/s</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
};

export default App;
