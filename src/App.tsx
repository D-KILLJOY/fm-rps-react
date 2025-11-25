import { useEffect, useState } from "react";
import logo from "./assets/images/logo.svg";
import bonusLogo from "./assets/images/logo-bonus.svg";
import closeIcon from "./assets/images/icon-close.svg";

import rock from "./assets/images/icon-rock.svg";
import paper from "./assets/images/icon-paper.svg";
import scissors from "./assets/images/icon-scissors.svg";
import spock from "./assets/images/icon-spock.svg";
import lizard from "./assets/images/icon-lizard.svg";
import rules from "./assets/images/image-rules.svg";
import bonusRules from "./assets/images/image-rules-bonus.svg";

type game = "normal" | "bonus";
type gameEnd = "win" | "draw" | "lose" | "";
type Selections = "rock" | "paper" | "scissors" | "lizard" | "spock" | "";

type GameSels = {
    name: Selections;
    className: string;
    img: string;
    bnsClass: string;
};

const normalSelections: GameSels[] = [
    {
        name: "rock",
        className: "rock__btn",
        img: rock,
        bnsClass: "bns__rock__btn",
    },
    {
        name: "paper",
        className: "paper__btn",
        img: paper,
        bnsClass: "bns__paper__btn",
    },
    {
        name: "scissors",
        className: "scissors__btn",
        img: scissors,
        bnsClass: "bns__scissors__btn",
    },
];

const allSelections: GameSels[] = [
    ...normalSelections,
    {
        name: "spock",
        className: "spock__btn",
        img: spock,
        bnsClass: "bns__spock__btn",
    },
    {
        name: "lizard",
        className: "lizard__btn",
        img: lizard,
        bnsClass: "bns__lizard__btn",
    },
];

function App() {
    const [score, setScore] = useState<number>(0);
    const [gameType, setGameType] = useState<game>("normal");
    const [gameToggle, setGameToggle] = useState<boolean>(false);
    const [showRules, setShowRules] = useState<boolean>(false);
    const [playerSel, setPlayerSel] = useState<Selections>("");
    const [houseSel, setHouseSel] = useState<Selections>("");
    const [gameEnd, setGameEnd] = useState<gameEnd>("");

    function toggleRule() {
        setShowRules((prev) => !prev);
    }

    function toggleMode() {
        setGameType((prev) => (prev === "normal" ? "bonus" : "normal"));
        setPlayerSel("");
        setScore(0);
        toggleGame();
    }

    function toggleGame() {
        setGameToggle((prev) => !prev);
    }

    function playAgain() {
        setPlayerSel("");
        setHouseSel("");
        setGameEnd("");
    }

    useEffect(() => {
        if (gameEnd !== "") {
            function updateScore() {
                if (gameEnd === "win") {
                    setScore((prev) => prev + 2);
                } else if (gameEnd === "draw") {
                    setScore((prev) => prev + 0);
                } else if (gameEnd === "lose") {
                    setScore((prev) => prev - 1);
                }
            }

            updateScore();
        }
    }, [gameEnd]);

    useEffect(
        function delay() {
            setTimeout(function dispSel() {
                if (houseSel !== "") {
                    if (gameType === "normal") {
                        if (playerSel === "rock") {
                            houseSel === "rock"
                                ? setGameEnd("draw")
                                : houseSel === "paper"
                                ? setGameEnd("lose")
                                : setGameEnd("win");
                        } else if (playerSel === "paper") {
                            houseSel === "rock"
                                ? setGameEnd("win")
                                : houseSel === "paper"
                                ? setGameEnd("draw")
                                : setGameEnd("lose");
                        } else {
                            houseSel === "rock"
                                ? setGameEnd("lose")
                                : houseSel === "paper"
                                ? setGameEnd("win")
                                : setGameEnd("draw");
                        }
                    } else if (gameType === "bonus") {
                        if (playerSel === "rock") {
                            houseSel === "rock"
                                ? setGameEnd("draw")
                                : houseSel === "paper"
                                ? setGameEnd("lose")
                                : houseSel === "scissors"
                                ? setGameEnd("win")
                                : houseSel === "lizard"
                                ? setGameEnd("win")
                                : setGameEnd("lose");
                        } else if (playerSel === "paper") {
                            houseSel === "rock"
                                ? setGameEnd("win")
                                : houseSel === "paper"
                                ? setGameEnd("draw")
                                : houseSel === "scissors"
                                ? setGameEnd("lose")
                                : houseSel === "lizard"
                                ? setGameEnd("lose")
                                : setGameEnd("win");
                        } else if (playerSel === "scissors") {
                            houseSel === "rock"
                                ? setGameEnd("lose")
                                : houseSel === "paper"
                                ? setGameEnd("win")
                                : houseSel === "scissors"
                                ? setGameEnd("draw")
                                : houseSel === "lizard"
                                ? setGameEnd("win")
                                : setGameEnd("lose");
                        } else if (playerSel === "lizard") {
                            houseSel === "rock"
                                ? setGameEnd("lose")
                                : houseSel === "paper"
                                ? setGameEnd("win")
                                : houseSel === "scissors"
                                ? setGameEnd("lose")
                                : houseSel === "lizard"
                                ? setGameEnd("draw")
                                : setGameEnd("win");
                        } else if (playerSel === "spock") {
                            houseSel === "rock"
                                ? setGameEnd("win")
                                : houseSel === "paper"
                                ? setGameEnd("lose")
                                : houseSel === "scissors"
                                ? setGameEnd("win")
                                : houseSel === "lizard"
                                ? setGameEnd("lose")
                                : setGameEnd("draw");
                        }
                    }
                }
            }, 1000);
        },
        [houseSel]
    );

    function playSel(play: Selections) {
        play === "rock"
            ? setPlayerSel("rock")
            : play === "paper"
            ? setPlayerSel("paper")
            : play === "scissors"
            ? setPlayerSel("scissors")
            : play === "lizard"
            ? setPlayerSel("lizard")
            : play === "spock" && setPlayerSel("spock");
    }

    useEffect(
        function delay() {
            setTimeout(function genHouseSel() {
                const houseSels: Selections[] = [
                    "rock",
                    "paper",
                    "scissors",
                    "lizard",
                    "spock",
                ];
                if (playerSel !== "") {
                    if (gameType === "normal") {
                        const ranNum = Math.floor(Math.random() * 3);
                        setHouseSel(houseSels[ranNum]);
                    } else if (gameType === "bonus") {
                        const ranNum = Math.floor(Math.random() * 5);
                        setHouseSel(houseSels[ranNum]);
                    }
                }
            }, 1000);
        },
        [playerSel]
    );

    return (
        <main className="main__con">
            <section className="main">
                <header className="main__header">
                    {gameType === "normal" && (
                        <img src={logo} alt="" className="main__logo" />
                    )}
                    {gameType === "bonus" && (
                        <img src={bonusLogo} alt="" className="main__logo" />
                    )}
                    <div className="score">
                        <h1 className="text">score</h1>
                        <p className="score__disp">{score}</p>
                    </div>
                </header>
                <section className="game__section">
                    {gameToggle === true && (
                        <div className="modal">
                            <div className="prompt ">
                                <p>
                                    you're currently playing the{" "}
                                    <span className="warning">{gameType}</span>{" "}
                                    game, Do you wish to switch to{" "}
                                    <span className="warning">
                                        {gameType === "normal"
                                            ? "bonus"
                                            : "normal"}
                                    </span>{" "}
                                    game ?
                                </p>
                                <p className="warning__text">
                                    This will reset your score
                                </p>
                                <div className="prompt__btns__con">
                                    <button
                                        type="button"
                                        onClick={toggleGame}
                                        className="prompt__btn cancel"
                                    >
                                        cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={toggleMode}
                                        className="prompt__btn confirm"
                                    >
                                        confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {gameType === "normal" && playerSel === "" && (
                        <div className="normal__game__btns__con">
                            {normalSelections.map((selection) => (
                                <button
                                    type="button"
                                    key={selection.name}
                                    onClick={() => playSel(selection.name)}
                                    className={`game__btn ${selection.className}`}
                                >
                                    <img
                                        className="btn__icon"
                                        src={selection.img}
                                        alt={`${selection.name} icon`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                    {gameType === "bonus" && playerSel === "" && (
                        <div className="bonus__game__btns__con">
                            {allSelections.map((selection) => (
                                <button
                                    type="button"
                                    key={selection.name}
                                    onClick={() => playSel(selection.name)}
                                    className={`bns__game__btn ${selection.bnsClass}`}
                                >
                                    <img
                                        src={selection.img}
                                        alt={`${selection.name} icon`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                    {playerSel !== "" && (
                        <section className="played__section">
                            <div className="game__selections">
                                <div className="player__selection">
                                    <div
                                        className={`selected__btn ${
                                            gameEnd === "win" &&
                                            "plyr__sel__btn "
                                        } `}
                                    >
                                        {allSelections.map(
                                            (gamesel) =>
                                                playerSel === gamesel.name && (
                                                    <div
                                                        key={gamesel.name}
                                                        className={`player__sel__btn ${gamesel.name}`}
                                                    >
                                                        <img
                                                            src={gamesel.img}
                                                            alt={`${gamesel.name} icon`}
                                                        />
                                                    </div>
                                                )
                                        )}
                                    </div>
                                    <p className="sel__text">You picked</p>
                                </div>
                                <div className="house__selection">
                                    <div
                                        className={`selected__btn ${
                                            gameEnd === "lose" &&
                                            "plyr__sel__btn "
                                        } `}
                                    >
                                        {allSelections.map(
                                            (gamesel) =>
                                                houseSel === gamesel.name && (
                                                    <div
                                                        key={gamesel.name}
                                                        className={`player__sel__btn ${gamesel.name}`}
                                                    >
                                                        <img
                                                            src={gamesel.img}
                                                            alt={`${gamesel.name} icon`}
                                                        />
                                                    </div>
                                                )
                                        )}
                                    </div>
                                    <p className="sel__text">
                                        the house picked
                                    </p>
                                </div>

                                {gameEnd !== "" && (
                                    <div className="game__stats">
                                        <p className="game__stat">
                                            {gameEnd === "win"
                                                ? "you win"
                                                : gameEnd === "lose"
                                                ? "you lose"
                                                : "draw"}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={playAgain}
                                            className="new__game__btn"
                                        >
                                            play again
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                    <div className="game__settings">
                        <button
                            type="button"
                            className="game__set"
                            onClick={toggleRule}
                        >
                            rules
                        </button>
                        {playerSel === "" && (
                            <button
                                type="button"
                                onClick={toggleGame}
                                className="game__set"
                            >
                                Game Mode
                            </button>
                        )}
                    </div>

                    {showRules === true && (
                        <div className="modal">
                            <div className="rules__con">
                                <div className="rule__head">
                                    <h2 className="rules">rules</h2>
                                    <button
                                        type="button"
                                        className="close__btn mb__hidden"
                                        onClick={toggleRule}
                                    >
                                        <img src={closeIcon} alt="close" />
                                    </button>
                                </div>
                                {gameType === "normal" && (
                                    <img src={rules} alt="rules" />
                                )}
                                {gameType === "bonus" && (
                                    <img src={bonusRules} alt="rules" />
                                )}
                                <button
                                    type="button"
                                    className="close__btn lg__hidden"
                                    onClick={toggleRule}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </section>

            <p className="attribution">
                Challenge by{" "}
                <a
                    target="blank"
                    href="https://www.frontendmentor.io/?ref=challenge"
                >
                    Frontend Mentor
                </a>
                . Coded by{" "}
                <a target="blank" href="https://linktr.ee/didiauche">
                    Didia Uchenna
                </a>{" "}
                .
            </p>
        </main>
    );
}

export default App;
