import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import logo from "../public/logo2.png"
import magn from "../public/magn.png"
import circle from "../public/circle.png"
import { championsJson } from "../public/champions.js"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function Home() {

  const [champions, setChampions] = useState(championsJson);
  const [index, setIndex] = useState(0);
  const [firstPicked, setFirstPicked] = useState(false);
  const [lastPicked, setLastPicked] = useState(null);

  const [loaderProps, setLoaderProps] = useState({
    opacity: 1,
    fontSize: "10vh",
    picSize: "w-1/2"
  });

  useEffect(() => {
    setTimeout(() => {
      setLoaderProps({
        opacity: 0,
        fontSize: "8vh",
        visibility: "hidden",
        picSize: "w-1/3"
      })
    }, 1000)

    const interval = setInterval(function () {
      setIndex(index => (Math.floor(Math.random() * 152)));
    }, 150)

    return () => {
      clearInterval(interval)
    };
  }, [])

  const pickFirst = () => {
    const circle = document.getElementById("circle");
    setFirstPicked(true);

    circle.classList.add("fadeoutcircle");
    setTimeout(() => {
      circle.remove();
    }, 500)

    const titleDiv = document.getElementById("titlediv");
    titleDiv.classList.add("fadeOutTitle");
    setTimeout(() => {
    }, 1100)

    const championSelect = document.getElementById("championselect");
    championSelect.classList.add("championselectFull");

    const mainDiv = document.getElementById("mainDiv");
    mainDiv.classList.add("mainDivFull");
    // titleDiv.classList.add("titleShrink");

    const champRows = document.getElementsByClassName("champRows");
    for (var i = 0; i < champRows.length; i++) {
      champRows[i].classList.add("champRowsFull");
    }

    const selectorDiv = document.getElementById("selector");
    selectorDiv.classList.add("selectorFull");
  }

  const pick = (event) => {
    event.stopPropagation();

    if(lastPicked==null){
    }else{
      if(!event.target.isSameNode(lastPicked)){
        lastPicked.closest(".champrow").classList.remove("champrowselected");
      }
    }

    if (!firstPicked) {
      pickFirst();
    }

    event.target.closest(".champrow").classList.add("champrowselected");

    // console.log(lastPicked);
    setLastPicked(event.target);
    document.getElementById("inputname").focus();
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <div id='mainDiv' className="z-9 w-10/12 h-screen items-center font-mono flex flex-col font-beaufort align-middle justify-center text-center p-10 mainDiv">
        <div id='titlediv' className='h-2/6 px-10'>
          <div style={{ fontSize: "8vh" }}>CHAMPICKR</div>
          <div>Calculate the class and subclass of the champion you have the best winning chance with, based on the enemy dominating class.</div>
        </div>
        <div id="championselect" className={`flex flex-row w-full championselect`}>
          <div className={`w-[30%] flex flex-col champRows`}>
            <div className='h-1/5 grborder1 flex flex-row p-3 gap-3 items-center champrow champrowleft'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[index].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder2 flex flex-row p-3 gap-3 items-center champrow champrowleft'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 1) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder3 flex flex-row p-3 gap-3 items-center champrow champrowleft'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 2) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder4 flex flex-row p-3 gap-3 items-center champrow champrowleft'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 3) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder5 flex flex-row p-3 gap-3 items-center champrow champrowleft'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 4) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
          </div>

          <div className='w-[40%] flex flex-col align-middle justify-center relative'>
            <div id="circle">
              <div style={{ padding: "15vh", fontSize: "4vh" }} className='z-10 pointer-events-none'>Pick at least one champion to calculate</div>
              <div id="" className='absolute m-auto top-0 left-0 bottom-0 right-0 flex flex-row items-center justify-center z-0'>
                <Image src={circle} width={400} alt="circle" className='circle' />
              </div>
            </div>
            <div id='selector' className='absolute h-4/5 border border-red-800 left-0 right-0 m-auto selector'>
              <div className='searchbar flex flex-row justify-between align-middle'>
                <input id="inputname" type='text' placeholder='Start typing...' className='w-4/5 inputfield' style={{ flex: 1 }} />
                <div style={{ width: "50px", margin: "2vh" }}>
                  <Image src={magn} alt='magnifyer' />
                </div>
              </div>
              <div className='champlist container m-auto '>
                <div className='w-full grid grid-cols-7 gap-1 champsscroll'>
                  {champions.map((champion, index) => {
                    return (
                      <div className='champ' key={champion.key}>
                        <Image src={champion.icon} width={100} height={100} alt={champion.name} style={{ objectFit: "contain" }} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div id="champRows" className='w-[30%] flex flex-col gap-3 champRows'>
            <div className='h-1/5 grborder6 flex flex-row-reverse p-3 gap-3 items-center champrow champrowright'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 5) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder7 flex flex-row-reverse p-3 gap-3 items-center champrow champrowright'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 6) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder8 flex flex-row-reverse p-3 gap-3 items-center champrow champrowright'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 7) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder9 flex flex-row-reverse p-3 gap-3 items-center champrow champrowright'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 8) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
            <div className='h-1/5 grborder10 flex flex-row-reverse p-3 gap-3 items-center champrow champrowright'>
              <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                <Image className='champpic' src={champions[(index + 9) % 152].icon} fill sizes='50px' style={{ filter: "grayscale(100%)" }} alt='champ' />
                <div className='picshadow' onClick={(event) => pick(event)}></div>
              </div>
              <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div id='loader' style={loaderProps} className="absolute top-0 left-0 z-10 w-full h-full items-center flex flex-col font-beaufort align-middle justify-center text-center loader">
        <Image src={logo} className={`${loaderProps.picSize} loaderImage`} alt='logo' priority />
      </div>
    </main>
  )
}
