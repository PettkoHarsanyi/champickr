import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import logo from "../public/logo2.png"
import magn from "../public/magn.png"
import circle from "../public/circle.png"
import top from "../public/positions/top.webp"
import jungle from "../public/positions/jungle.webp"
import mid from "../public/positions/mid.webp"
import bottom from "../public/positions/bottom.webp"
import support from "../public/positions/support.webp"
import { championsJson } from "../public/champions.js"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function Home() {

  const PICLINK = "http://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/";
  const [champions, setChampions] = useState(championsJson);
  const [index, setIndex] = useState(0);
  const [firstPicked, setFirstPicked] = useState(false);
  const [lastPicked, setLastPicked] = useState(null);

  const [champSelect, setChampSelect] = useState(Object.values(championsJson));
  const [selectedPlayer, setSelectedPlayer] = useState({ "player": "", "team": "" });
  const [positionPics] = useState([{ "pos": top, "name": "top" }, { "pos": jungle, "name": "jungle" }, { "pos": mid, "name": "mid" }, { "pos": bottom, "name": "bottom" }, { "pos": support, "name": "support" }]);

  const posToPics = { "top": top, "jungle": jungle, "mid": mid, "bottom": bottom, "support": support }
  const posToCSSPOS = { "top": 0, "jungle": "-100%", "mid": "-200%", "bottom": "-300%", "support": "-400%" }

  const [players, setPlayers] = useState({
    "blue": {
      "player1": {
        "key": "player1",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "top",
        "pos": "",
      },
      "player2": {
        "key": "player2",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "jungle",
        "pos": "",
      },
      "player3": {
        "key": "player3",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "mid",
        "pos": "",
      },
      "player4": {
        "key": "player4",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "bottom",
        "pos": "",
      },
      "player5": {
        "key": "player5",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "support",
        "pos": "",
      }
    },
    "red": {
      "player1": {
        "key": "player1",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "top",
        "pos": "",
      },
      "player2": {
        "key": "player2",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "jungle",
        "pos": "",
      },
      "player3": {
        "key": "player3",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "mid",
        "pos": "",
      },
      "player4": {
        "key": "player4",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "bottom",
        "pos": "",
      },
      "player5": {
        "key": "player5",
        "champion": {},
        "role": {},
        "isPicked": false,
        "primPos": "support",
        "pos": "",
      }
    }

  })

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

  const selectFirstPlayer = () => {
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


    const input = document.getElementById("inputname");
    input.style.visibility = "visible";
    input.focus();
  }

  const selectPlayer = (event, _player, _team) => {
    event.stopPropagation();

    const selectorDiv = document.getElementById("selector");
    selectorDiv.classList.add("selectorFull");

    if (lastPicked == null) {
    } else {
      if (!event.target.isSameNode(lastPicked)) {
        lastPicked.closest(".champrow").classList.remove("champrowselected");
      }
    }

    if (!firstPicked) {
      selectFirstPlayer();
    }


    const input = document.getElementById("inputname");
    input.value = "";
    input.focus();
    setChampSelect(Object.values(championsJson));
    input.addEventListener("focusout", function () {
      let _this = this;
      setTimeout(function () {
        _this.focus();
      }, 0);
    })

    event.target.closest(".champrow").classList.add("champrowselected");

    // console.log(lastPicked);
    setLastPicked(event.target);
    setSelectedPlayer({ player: _player, team: _team });
  }



  const handleInput = (event) => {
    setChampSelect(Object.values(champions).filter((champ) =>
      champ.name.toUpperCase().includes(event.target.value.toUpperCase())
    ))
  }

  const handlePick = (_champion) => {
    const selectorDiv = document.getElementById("selector");
    selectorDiv.classList.remove("selectorFull")
    const input = document.getElementById("inputname");
    input.value = "";

    setPlayers({
      ...players, [selectedPlayer.team]: {
        ...players[selectedPlayer.team], [selectedPlayer.player]: {
          ...players[selectedPlayer.team][selectedPlayer.player],
          champion: _champion,
          isPicked: true,
        }
      }
    })
    lastPicked.closest(".champrow").classList.remove("champrowselected");
    lastPicked.classList.add("picshadowPicked");
    lastPicked.previousElementSibling.classList.add("champpicPicked")
  }

  const [lockedDiv, setLockedDiv] = useState(null);

  const handlePickPos = (_pos, _player, _team, playerIndex) => {
    setPlayers({
      ...players, [_team]: {
        ...players[_team], [_player]: {
          ...players[_team][_player],
          pos: _pos.name,
        }
      }
    })


    const posDiv = document.getElementById("posplayer" + playerIndex);
    posDiv.style.width = "100%"
    posDiv.style.backgroundColor = "transparent"
    const innerPosDiv = document.getElementById("innerpos" + playerIndex);
    innerPosDiv.style.right = 0;
    innerPosDiv.style.opacity = 0;
    const frontDiv = document.getElementById("frontDiv" + playerIndex);
    frontDiv.classList.remove("frontDivAnimForward")
    setLockedDiv(posDiv);

    setTimeout(() => {
      setLockedDiv(null);
    }, 500)
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
            {Object.values(players.blue).map((player, playerIndex) => {
              return (
                <div className={`h-1/5 grborder${playerIndex + 1} flex flex-row p-3 gap-3 items-center champrow champrowleft`} key={playerIndex}>
                  <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                    <Image className='champpic' src={player.isPicked ? (PICLINK + player.champion.image.full) : (PICLINK + Object.values(champions)[(index + playerIndex) % Object.keys(champions).length].image.full)} fill sizes='50px' alt='champ' />
                    <div className='picshadow' onClick={(event) => selectPlayer(event, player.key, "blue")}></div>
                  </div>
                  <div className='h-3/4 aspect-square relative'  >
                    <div id={`posplayer${playerIndex}`} className='rounded-full absolute left-0' style={{ height: "100%", width: "100%", border: "0.2vh solid #b99c6a", transition: "all 0.5s, opacity 1s", minWidth: "100%", overflow: "hidden", zIndex: "50" }}
                      onMouseOver={(event) => {
                        const posDiv = document.getElementById("posplayer" + playerIndex);
                        if (lockedDiv !== null && lockedDiv.isSameNode(posDiv)) {
                          return;
                        }
                        posDiv.style.width = "500%"
                        posDiv.style.backgroundColor = "#010a13"
                        const innerPosDiv = document.getElementById("innerpos" + playerIndex);
                        innerPosDiv.style.right = 0;
                        innerPosDiv.style.opacity = 1;
                        const frontDiv = document.getElementById("frontDiv" + playerIndex);
                        frontDiv.classList.remove("frontDivAnimBackward")
                        frontDiv.classList.add("frontDivAnimForward");
                      }} onMouseLeave={(event) => {
                        const posDiv = document.getElementById("posplayer" + playerIndex);
                        posDiv.style.width = "100%"
                        posDiv.style.backgroundColor = "transparent"
                        const innerPosDiv = document.getElementById("innerpos" + playerIndex);
                        innerPosDiv.style.right = 0;
                        innerPosDiv.style.opacity = 0;
                        const frontDiv = document.getElementById("frontDiv" + playerIndex);
                        frontDiv.classList.remove("frontDivAnimForward")
                        frontDiv.classList.add("frontDivAnimBackward");
                      }}
                    >
                      <div id={`innerpos${playerIndex}`} style={{ position: "relative", transition: "0.5s all", opacity: 0, width: "100%", right: 0 }} className='h-full flex flex-row justify-between'>
                        {positionPics.map((pos, index) => {
                          return (
                            <div className='h-full aspect-square pos' style={{ padding: "1vh", cursor: "pointer", display: "inline-block" }} onClick={() => { handlePickPos(pos, player.key, "blue", playerIndex) }} key={index}>
                              <Image src={pos.pos} alt='position' />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div id={`frontDiv${playerIndex}`} className='absolute left-0 rounded-full h-full w-full flex flex-col justify-between pt-1' style={{ zIndex: "52", backgroundColor: "#010a13", border: "0.2vh solid #b99c6a", pointerEvents: "none", transition: "0.5s all" }}>
                      <Image src={player.pos == "" ? posToPics[player.primPos] : posToPics[player.pos]} alt='position' className='h-3/5 aspect-square' style={{objectFit: "contain"}}/>
                      <div className='text-lg h-2/5' style={{lineHeight:"1"}}>20%</div>

                    </div>
                  </div>

                </div>
              )
            })}
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
                <input onChange={handleInput} id="inputname" type='text' placeholder='Start typing...' className='w-4/5 inputfield' style={{ flex: 1 }} autoFocus />
                <div style={{ width: "50px", margin: "2vh" }}>
                  <Image src={magn} alt='magnifyer' />
                </div>
              </div>
              <div className='champlist container m-auto '>
                <div className='w-full grid grid-cols-7 gap-1 champsscroll'>
                  {Object.values(champSelect).map((champion, index) => {
                    return (
                      <div className='champ' key={champion.key}>
                        <Image onClick={() => handlePick(champion)} src={PICLINK + champion.image.full} width={100} height={100} alt={champion.name} style={{ objectFit: "contain" }} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className='w-[30%] flex flex-col gap-3 champRows'>
            {Object.values(players.red).map((player, playerIndex) => {
              return (
                <div className={`h-1/5 grborder${playerIndex + 6} flex flex-row-reverse p-3 gap-3 items-center champrow champrowright`} key={playerIndex}>
                  <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                    <Image className='champpic' src={player.isPicked ? (PICLINK + player.champion.image.full) : (PICLINK + Object.values(champions)[(index + playerIndex) % Object.keys(champions).length].image.full)} fill sizes='50px' alt='champ' />
                    <div className='picshadow' onClick={(event) => selectPlayer(event, player.key, "red")}></div>
                  </div>
                  <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
                </div>
              )
            })}
          </div>
        </div>


      </div>

      <div id='loader' style={loaderProps} className="absolute top-0 left-0 z-[1000] w-full h-full items-center flex flex-col font-beaufort align-middle justify-center text-center loader">
        <Image src={logo} className={`${loaderProps.picSize} loaderImage`} alt='logo' priority />
      </div>
    </main>
  )
}
