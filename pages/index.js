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
import controller from "../public/classes/controller.webp"
import fighter from "../public/classes/fighter.webp"
import mage from "../public/classes/mage.webp"
import slayer from "../public/classes/slayer.webp"
import marksman from "../public/classes/marksman.webp"
import tank from "../public/classes/tank.webp"
import { championsJson } from "../public/champions.js"
import { playersJson } from "../public/players.js"
import { classes } from "../public/classes.js"
import { RxCrossCircled } from "react-icons/rx"
import ashe from "../public/champs/Ashe.png"
import ahri from "../public/champs/Ahri.png"
import amumu from "../public/champs/Amumu.png"
import garen from "../public/champs/Garen.png"
import riven from "../public/champs/Riven.png"
import vayne from "../public/champs/Vayne.png"
import yasuo from "../public/champs/Yasuo.png"
import zac from "../public/champs/Zac.png"
import zed from "../public/champs/Zed.png"

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
  const [classSelector, setClassSelector] = useState([]);
  const [laneSelector, setLaneSelector] = useState("");

  const [positionPics] = useState([{ "pos": top, "name": "top" }, { "pos": jungle, "name": "jungle" }, { "pos": mid, "name": "mid" }, { "pos": bottom, "name": "bottom" }, { "pos": support, "name": "support" }]);
  const [champpics] = useState([ashe, ahri, amumu, garen, riven, vayne, yasuo, zac, zed])

  const posToPics = { "top": top, "jungle": jungle, "mid": mid, "bottom": bottom, "support": support }
  const classToPics = { "Tank": tank, "Controller": controller, "Fighter": fighter, "Mage": mage, "Assassin": slayer, "Marksman": marksman }

  const [players, setPlayers] = useState(playersJson)

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


    players.forEach(player => {
      modifyPlayer(player.key, calculateClassProb(player))
    })

    return () => {
      clearInterval(interval)
    };
  }, [])

  const calculateClassProb = (player, _pos) => {
    let pos;
    if (_pos) {
      pos = _pos;
    } else {
      if (player.posPicked) {
        pos = player.pos;
      } else {
        pos = player.primPos;
      }
    }

    let classesOnPos = [];

    Object.values(champions).forEach((champion) => {
      if (champion.lanes.includes(pos)) {
        champion.tags.forEach((cls) => {
          if (classesOnPos.every(alrdClass => { return alrdClass.name !== cls })) {
            classesOnPos.push({ "name": cls, "count": 1 })
          } else {
            classesOnPos = classesOnPos.map(alrdClass => {
              if (alrdClass.name === cls) {
                return {
                  ...alrdClass,
                  "count": alrdClass.count + 1,
                }
              } else {
                return alrdClass;
              }
            })
          }
        })
      }
    })


    classesOnPos.sort((a, b) => { return b.count - a.count });

    const champsOnLane = classesOnPos.reduce((a, b) => a + b.count, 0);

    return {
      "classProb": [
        { "class": classesOnPos[0].name, "prob": classesOnPos[0].count / champsOnLane * 100 },
        { "class": classesOnPos[1].name, "prob": classesOnPos[1].count / champsOnLane * 100 },
        { "class": classesOnPos[2].name, "prob": classesOnPos[2].count / champsOnLane * 100 },
      ]
    }
  }

  useEffect(() => {
    console.log(players);
  }, [players])

  const selectFirstPlayer = () => {
    const circle = document.getElementById("circle");
    setFirstPicked(true);

    circle.classList.add("fadeoutcircle");
    setTimeout(() => {
      circle.remove();
    }, 500)

    const titleDiv = document.getElementById("titlediv");
    titleDiv.classList.add("fadeOutTitle");

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

  const filterChampName = (name) => {
    setChampSelect(Object.values(champions).filter((champ) =>
      champ.id.toUpperCase().includes(name.toUpperCase())
    ))
  }

  const handlePick = (_champion) => {
    const selectorDiv = document.getElementById("selector");
    selectorDiv.classList.remove("selectorFull")
    const input = document.getElementById("inputname");
    input.value = "";

    const champClasses = _champion.tags.map((cls) => {
      return { "class": cls, "prob": 100 }
    })

    modifyPlayer(selectedPlayer.player, { "champion": _champion, "isPicked": true, "classProb": champClasses })

    lastPicked.closest(".champrow").classList.remove("champrowselected");
    lastPicked.classList.add("picshadowPicked");
    lastPicked.previousElementSibling.classList.add("champpicPicked")
    setLaneSelector("");
    setClassSelector([]);
  }

  const [lockedDiv, setLockedDiv] = useState(null);

  const handlePickPos = async (_pos, playerName, playerIndex) => {
    const player = players.find(player => player.key === playerName);
    let _players = players;

    const posDiv = document.getElementById("posplayer" + playerIndex);
    posDiv.style.width = "100%"
    posDiv.style.backgroundColor = "transparent"
    const innerPosDiv = document.getElementById("innerpos" + playerIndex);
    innerPosDiv.style.right = 0;
    innerPosDiv.style.opacity = 0;
    const frontDiv = document.getElementById("frontDiv" + playerIndex);
    frontDiv.classList.remove("frontDivAnimForward")
    posDiv.classList.remove("pickAnimation");
    posDiv.classList.add("posPicked");
    setLockedDiv(posDiv);

    setTimeout(() => {
      setLockedDiv(null);
    }, 500)

    if (player.primPos !== _pos.name) {
      const playerPosTaken = players.find((_player2) => _player2.team == player.team && _player2.primPos == _pos.name)
      if (playerPosTaken) {
        _players = _players.map((plyr) => {
          if (plyr.key === playerPosTaken.key) {
            if(plyr.isPicked){
              return {
                ...playerPosTaken,
                "primPos": player.primPos,
              }  
            }
            return {
              ...playerPosTaken,
              "primPos": player.primPos,
              ...calculateClassProb(plyr.key, player.primPos)
            }
          } else {
            return plyr
          }
        })
      }
    }

    if (_players.some((plyr) => plyr.team === player.team && _pos.name === plyr.pos)) {
      if (player.posPicked) {
        _players = _players.map(plyr => {
          if (plyr.team === player.team && _pos.name === plyr.pos) {
            return {
              ...plyr,
              pos: player.pos,
              ...calculateClassProb(plyr.key, player.pos)
            }
          } else {
            return plyr;
          }
        })
      } else {
        _players = _players.map(plyr => {
          if (plyr.team === player.team && _pos.name === plyr.pos) {
            return {
              ...plyr,
              pos: player.primPos,
              ...calculateClassProb(plyr.key, player.primPos)
            }
          } else {
            return plyr;
          }
        })
      }
    }


    _players = _players.map(_player2 => {
      if (_player2.key === player.key) {
        return {
          ..._player2,
          "posPicked": true,
          "pos": _pos.name,
          ...calculateClassProb(player.key, _pos.name)
        }
      } else {
        return _player2
      }
    })

    _players = updatePosProbs(_players);

    setPlayers(_players);
  }

  const updatePosProbs = (_players) => {
    let pickedNumBlue = 0;
    let pickedNumRed = 0;

    _players.forEach((player) => {
      if (player.team == "blue" && player.posPicked) {
        pickedNumBlue++;
      }
      if (player.team == "red" && player.posPicked) {
        pickedNumRed++;
      }
    })

    _players = _players.map((player) => {
      if (player.team === "blue") {
        if (pickedNumBlue == 4) {
          if(player.posPicked){
            return player;  
          }
          return {
            ...player,
            "posPicked": true,
            "pos": player.primPos,
          }
        } else {
          return {
            ...player,
            "posProb": (Math.floor(1 / (5 - pickedNumBlue) * 100)),
          }
        }
      }
      if (player.team === "red") {
        if (pickedNumRed == 4) {
          if(player.posPicked){
            return player;  
          }
          return {
            ...player,
            "posPicked": true,
            "pos": player.primPos,
          }
        } else {
          return {
            ...player,
            "posProb": (Math.floor(1 / (5 - pickedNumRed) * 100)),
          }
        }
      }
    })

    return _players;
  }



  const secondBaseCountersOf = (_class) => {
    const secondBaseCounters = [];
    classes[_class].counter.forEach((counter) => {

      for (const [key, value] of Object.entries(classes)) {
        if (value.strongAgainst.includes(counter)) {
          secondBaseCounters.push(value.name);
        }
      }
    })

    const result = {}
    for (let i = 0; i < secondBaseCounters.length; i++) {
      const item = secondBaseCounters[i];
      if (result[item]) {
        result[item] += 1;
      } else {
        result[item] = 1;
      }
    }
  }

  useEffect(() => {
    secondBaseCountersOf("marksman");
  }, [])


  const modifyPlayer = (_player, _modificationObj) => {
    setPlayers((players) => players.map(player => {
      if (player.key == _player) {
        return {
          ...player,
          ..._modificationObj
        }
      } else {
        return player
      }
    }))
  }

  const handlePickSelf = (playerName, playerIndex) => {
    const selfDivs = document.getElementsByClassName("selfpicker");
    for (let index = 0; index < selfDivs.length; index++) {
      selfDivs[index].classList.add("fadeOutMeDiv");
    }
    const clickedMeDiv = document.getElementById("leftpicshadow" + (playerIndex + 1));

    if (lastPicked !== null && lastPicked.isSameNode(clickedMeDiv)) {
      lastPicked.closest(".champrow").classList.remove("champrowselected");
      const selectorDiv = document.getElementById("selector");
      selectorDiv.classList.remove("selectorFull")
      setLastPicked(null);
    }

    modifyPlayer(playerName, { "self": true });
  }

  const handleSelectLane = (lane) => {
    setLaneSelector(() => {
      if (laneSelector == lane) {
        return ""
      }
      return lane;
    })
  }

  const handleSelectClass = (_class) => {
    setClassSelector(() => {
      if (classSelector.includes(_class)) {
        return classSelector.filter((_class2) => _class != _class2)
      }
      return [...classSelector, _class]
    })
  }

  useEffect(() => {
    filterSelection();
  }, [classSelector, laneSelector])

  const filterSelection = () => {
    if (laneSelector == "" && classSelector.length == 0) {
      setChampSelect(Object.values(champions));
    } else {
      if (laneSelector == "") {
        setChampSelect(
          Object.values(champions).filter(champ => {
            return classSelector.every(cls => champ.tags.includes(cls));
          })
        )
      }
      else {

        setChampSelect(
          Object.values(champions).filter((champ) => {
            return champ.lanes.includes(laneSelector);
          }).filter(champ => {
            return classSelector.every(cls => champ.tags.includes(cls));
          })
        )
      }
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <div id='mainDiv' className="z-9 w-full h-screen items-center font-mono font-beaufort align-middle justify-center text-center  mainDiv">
        <div id='titlediv' className='h-2/6 px-10'>
          <div style={{ fontSize: "8vh" }}>CHAMPICKR</div>
          <div>Calculate the class and subclass of the champion you have the best winning chance with, based on the enemy uncountered dominating class.</div>
        </div>


        <div id="championselect" className={`flex flex-row w-full championselect`}>

          <div className={`w-[30%] flex flex-col champRows`}>
            {players.map((player, playerIndex) => {
              if (player.team == "blue") {
                return (
                  <div className='flex flex-row h-1/5 align-middle items-center gap-5' key={playerIndex}>
                    <div className='w-[15%] cursor-pointer opacity-30 hover:opacity-100 text-gray-400 hover:text-green-600 transition-all selfpicker' onClick={() => handlePickSelf(player.key, playerIndex)}>me</div>
                    <div id={`leftchamprow${playerIndex + 1}`} className={`grborder${playerIndex + 1} grow h-full flex flex-row p-3 gap-3 items-center champrow champrowleft transition-all`} >
                      <div className='h-full aspect-square relative flex items-center justify-center' style={{ border: "0.2vh solid #b99c6a" }}>
                        {
                          !player.self ?
                            <>
                              <Image className='champpic' src={player.isPicked ? (PICLINK + player.champion.image.full) : (champpics[(index + playerIndex) % champpics.length])} fill sizes='50px' alt='champ' />
                              <div id={`leftpicshadow${playerIndex + 1}`} className='picshadow' onClick={(event) => selectPlayer(event, player.key, "blue")}></div>
                            </>
                            :
                            <div>YOU</div>
                        }
                      </div>
                      <div className='h-3/4 aspect-square relative'  >
                        <div id={`posplayer${playerIndex}`} className='rounded-full absolute left-0 pickAnimation' style={{ height: "100%", width: "100%", border: "0.2vh solid #b99c6a", transition: "all 0.5s, opacity 1s", minWidth: "100%", overflow: "hidden", zIndex: "50" }}
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
                                <div className='h-full aspect-square pos' style={{ padding: "1vh", cursor: "pointer", display: "inline-block" }} onClick={() => { handlePickPos(pos, player.key, playerIndex) }} key={index}>
                                  <Image src={pos.pos} alt='position' />
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div id={`frontDiv${playerIndex}`} className='absolute left-0 rounded-full h-full w-full flex flex-col justify-between' style={{ zIndex: "52", backgroundColor: "#010a13", border: "0.2vh solid #b99c6a", pointerEvents: "none", transition: "0.5s all" }}>
                          <Image src={player.pos == "" ? posToPics[player.primPos] : posToPics[player.pos]} alt='position' className={`${player.posPicked ? "h-max p-2" : "h-3/5"} aspect-square`} style={{ objectFit: "contain" }} />
                          {!player.posPicked && <div className='text-lg h-2/5' style={{ lineHeight: "1" }}>{player.posProb}%</div>}

                        </div>
                      </div>

                      <div className='flex-1 h-max flex flex-row items-center overflow-hidden gap-3'>
                        {player.classProb.length > 0 && player.classProb.map((cls, index) => {
                          return (<div className='flex flex-col' key={index}>
                            <Image src={classToPics[cls.class]} height={30} className='object-contain aspect-square' alt='pos' />
                            {!player.isPicked && <div className='text-sm'>{Math.floor(cls.prob)}%</div>}
                          </div>)
                        })}
                      </div>

                    </div>
                  </div>
                )

              }
            })}
          </div>

          <div className='w-[40%] flex flex-col align-middle justify-center relative'>
            <div id="circle">
              <div style={{ padding: "15vh", fontSize: "4vh" }} className='z-10 pointer-events-none'>Pick at least one champion to calculate</div>
              <div id="" className='absolute m-auto top-0 left-0 bottom-0 right-0 flex flex-row items-center justify-center z-0'>
                <Image src={circle} width={400} alt="circle" className='circle' />
              </div>
            </div>
            <div id='selector' className='absolute h-[90%] border border-red-800 left-0 right-0 m-auto selector'>
              <div className='searchbar flex flex-row justify-between align-middle items-center'>
                <input onChange={(event) => { filterChampName(event.target.value) }} id="inputname" type='text' placeholder='Start typing...' className='w-4/5 inputfield' style={{ flex: 1 }} autoFocus />
                <div style={{ width: "30px", margin: "2vh" }}>
                  <Image src={magn} alt='magnifyer' />
                </div>
                <div className='cursor-pointer' onClick={() => { filterChampName(""); document.getElementById("inputname").value = ""; setLaneSelector(""); setClassSelector([]) }}>
                  <RxCrossCircled className='text-6xl' />
                </div>
              </div>
              <div className='h-[20%] flex flex-col justify-evenly items-center'>
                <div className='border-[#b99c6a] border rounded-full flex flex-row gap-3 p-2 overflow-hidden w-[50%] justify-center'>
                  <Image src={tank} alt="tank" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={classSelector.includes("Tank") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectClass("Tank") }} />
                  <Image src={fighter} alt="fighter" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={classSelector.includes("Fighter") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectClass("Fighter") }} />
                  <Image src={mage} alt="mage" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={classSelector.includes("Mage") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectClass("Mage") }} />
                  <Image src={slayer} alt="slayer" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={classSelector.includes("Assassin") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectClass("Assassin") }} />
                  <Image src={marksman} alt="marksman" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={classSelector.includes("Marksman") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectClass("Marksman") }} />
                  <Image src={controller} alt="controller" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={classSelector.includes("Controller") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectClass("Controller") }} />
                </div>
                <div className='border-[#b99c6a] border rounded-full flex flex-row gap-3 p-2 overflow-hidden w-[40%] justify-center'>
                  <Image src={top} alt="top" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={laneSelector.includes("top") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectLane("top") }} />
                  <Image src={jungle} alt="jungle" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={laneSelector.includes("jungle") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectLane("jungle") }} />
                  <Image src={mid} alt="mid" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={laneSelector.includes("mid") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectLane("mid") }} />
                  <Image src={bottom} alt="bottom" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={laneSelector.includes("bottom") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectLane("bottom") }} />
                  <Image src={support} alt="support" style={{ width: "30px", aspectRatio: "1/1", objectFit: "contain" }} className={laneSelector.includes("support") ? "laneSelectorSelected" : "" + "aspect-square object-contain"} onClick={() => { handleSelectLane("support") }} />
                </div>
              </div>
              <div className='champlist container m-auto'>
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
            {players.map((player, playerIndex) => {
              if (player.team == "red") {

                return (
                  player.team == "red" ?
                    <div className='flex flex-row h-1/5 align-middle items-center gap-5' key={playerIndex}>
                      <div id={`rightchamprow${playerIndex + 1}`} className={`grborder${playerIndex + 1} grow h-full flex flex-row-reverse p-3 gap-3 items-center champrow champrowright transition-all`} >

                        <div className='h-full aspect-square relative flex items-center justify-center' style={{ border: "0.2vh solid #b99c6a" }}>
                          {
                            !player.self ?
                              <>
                                <Image className='champpic' src={player.isPicked ? (PICLINK + player.champion.image.full) : (champpics[(index + playerIndex) % champpics.length])} fill sizes='50px' alt='champ' />
                                <div id={`rightpicshadow${playerIndex + 1}`} className='picshadow' onClick={(event) => selectPlayer(event, player.key, "red")}></div>
                              </>
                              :
                              <div>YOU</div>
                          }
                        </div>
                        <div className='h-3/4 aspect-square relative'  >
                          <div id={`posplayer${playerIndex}`} className='rounded-full absolute left-0 pickAnimation' style={{ height: "100%", width: "100%", border: "0.2vh solid #b99c6a", transition: "all 0.5s, opacity 1s", minWidth: "100%", overflow: "hidden", zIndex: "50" }}
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

                          <div id={`frontDiv${playerIndex}`} className='absolute left-0 rounded-full h-full w-full flex flex-col justify-between' style={{ zIndex: "52", backgroundColor: "#010a13", border: "0.2vh solid #b99c6a", pointerEvents: "none", transition: "0.5s all" }}>
                            <Image src={player.pos == "" ? posToPics[player.primPos] : posToPics[player.pos]} alt='position' className={`${player.posPicked ? "h-max p-2" : "h-3/5"} aspect-square`} style={{ objectFit: "contain" }} />
                            {!player.posPicked && <div className='text-lg h-2/5' style={{ lineHeight: "1" }}>{player.posProb}%</div>}

                          </div>
                        </div>

                        <div className='flex-1 h-max flex flex-row-reverse items-center overflow-hidden gap-3'>
                          {player.classProb.length > 0 && player.classProb.map((cls, index) => {
                            return (<div className='flex flex-col' key={index}>
                              <Image src={classToPics[cls.class]} height={30} className='object-contain aspect-square' alt='pos' />
                              {!player.isPicked && <div className='text-sm'>{Math.floor(cls.prob)}%</div>}
                            </div>)
                          })}
                        </div>

                      </div>


                    </div> : <></>






                  // <div className={`h-1/5 grborder${playerIndex + 6} flex flex-row-reverse p-3 gap-3 items-center champrow champrowright`} key={playerIndex}>
                  //   <div className='h-full aspect-square relative' style={{ border: "0.2vh solid #b99c6a" }}>
                  //     <div className='picshadow' onClick={(event) => selectPlayer(event, player.key, "red")}></div>
                  //   </div>
                  //   <div className='h-3/4 m-5 aspect-square rounded-full' style={{ border: "0.2vh solid #b99c6a" }}></div>
                  // </div>
                )
              }

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
