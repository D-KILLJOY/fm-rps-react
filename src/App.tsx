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
type selections = "rock" | "paper" | "scissors" | "lizard" | "spock" | "";

function App() {
    const [score, setScore] = useState<number>(0);
    const [gameType, setGameType] = useState<game>("normal");
    const [showRules, setShowRules] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [playerSel, setPlayerSel] = useState<selections>("");
    const [houseSel, setHouseSel] = useState<selections>("");
    const [gameEnd, setGameEnd] = useState<gameEnd>("");

    function toggleRule() {
        setShowRules((prev) => !prev);
    }

    function toggleMode() {
        setGameType((prev) => (prev === "normal" ? "bonus" : "normal"));
        setPlayerSel("");
        setScore(0);
        openModal();
    }

    function openModal() {
        setModal((prev) => !prev);
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

    function playSel(play: selections) {
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
                const houseSels: selections[] = [
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
        <main className="main">
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
                {modal === true && <div className="modal"></div>}
                {modal === true && (
                    <div className="prompt ">
                        <p>
                            you're currently playing the{" "}
                            <span className="warning">{gameType}</span> game,
                        </p>
                        <p>
                            Do you wish to switch to{" "}
                            <span className="warning">
                                {gameType === "normal" ? "bonus" : "normal"}
                            </span>
                            game ?
                        </p>
                        <p className="warning__text">
                            This will reset your score
                        </p>
                        <div className="prompt__btns__con">
                            <button
                                onClick={openModal}
                                className="prompt__btn cancel"
                            >
                                cancel
                            </button>
                            <button
                                onClick={toggleMode}
                                className="prompt__btn confirm"
                            >
                                confirm
                            </button>
                        </div>
                    </div>
                )}
                {gameType === "normal" && playerSel === "" && (
                    <div className="normal__game__btns__con">
                        <button
                            onClick={() => playSel("paper")}
                            className="game__btn paper__btn"
                        >
                            <img src={paper} alt="paper" />
                        </button>
                        <button
                            onClick={() => playSel("scissors")}
                            className="game__btn scissors__btn"
                        >
                            <img src={scissors} alt="scissors" />
                        </button>
                        <button
                            onClick={() => playSel("rock")}
                            className="game__btn rock__btn"
                        >
                            <img src={rock} alt="rock" />
                        </button>
                    </div>
                )}
                {gameType === "bonus" && playerSel === "" && (
                    <div className="bonus__game__btns__con">
                        <button
                            onClick={() => playSel("spock")}
                            className="bns__game__btn bns__spock__btn"
                        >
                            <img src={spock} alt="spock" />
                        </button>
                        <button
                            onClick={() => playSel("scissors")}
                            className="bns__game__btn bns__scissors__btn"
                        >
                            <img src={scissors} alt="scissors" />
                        </button>
                        <button
                            onClick={() => playSel("paper")}
                            className="bns__game__btn bns__paper__btn"
                        >
                            <img src={paper} alt="paper" />
                        </button>
                        <button
                            onClick={() => playSel("rock")}
                            className="bns__game__btn bns__rock__btn"
                        >
                            <img src={rock} alt="rock" />
                        </button>
                        <button
                            onClick={() => playSel("lizard")}
                            className="bns__game__btn bns__lizard__btn"
                        >
                            <img src={lizard} alt="lizard" />
                        </button>
                    </div>
                )}
                {playerSel !== "" && (
                    <section className="played__section">
                        <div className="game__selections">
                            <div className="player__selection">
                                <div
                                    className={`selected__btn ${
                                        gameEnd === "win" && "plyr__sel__btn "
                                    } `}
                                >
                                    {playerSel === "rock" && (
                                        <div className="player__sel__btn rock">
                                            <img
                                                className="selImg"
                                                src={rock}
                                                alt="rock"
                                            />
                                        </div>
                                    )}
                                    {playerSel === "paper" && (
                                        <div className="player__sel__btn paper">
                                            <img
                                                className="selImg"
                                                src={paper}
                                                alt="paper"
                                            />
                                        </div>
                                    )}
                                    {playerSel === "scissors" && (
                                        <div className="player__sel__btn scissors">
                                            <img
                                                className="selImg"
                                                src={scissors}
                                                alt="scissors"
                                            />
                                        </div>
                                    )}
                                    {playerSel === "spock" && (
                                        <div className="player__sel__btn spock">
                                            <img src={spock} alt="spock" />
                                        </div>
                                    )}
                                    {playerSel === "lizard" && (
                                        <div className="player__sel__btn lizard">
                                            <img src={lizard} alt="lizard" />
                                        </div>
                                    )}
                                </div>
                                <p className="sel__text">You picked</p>
                            </div>
                            <div className="house__selection">
                                <div
                                    className={`selected__btn ${
                                        gameEnd === "lose" && "plyr__sel__btn "
                                    } `}
                                >
                                    {houseSel === "rock" && (
                                        <div className="house__sel__btn rock">
                                            <img src={rock} alt="rock" />
                                        </div>
                                    )}
                                    {houseSel === "paper" && (
                                        <div className="house__sel__btn paper">
                                            <img src={paper} alt="paper" />
                                        </div>
                                    )}
                                    {houseSel === "scissors" && (
                                        <div className="house__sel__btn scissors">
                                            <img
                                                src={scissors}
                                                alt="scissors"
                                            />
                                        </div>
                                    )}
                                    {houseSel === "spock" && (
                                        <div className="house__sel__btn spock">
                                            <img src={spock} alt="spock" />
                                        </div>
                                    )}
                                    {houseSel === "lizard" && (
                                        <div className="house__sel__btn lizard">
                                            <img src={lizard} alt="lizard" />
                                        </div>
                                    )}
                                </div>
                                <p className="sel__text">the house picked</p>
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
                    <button className="game__set" onClick={toggleRule}>
                        rules
                    </button>
                    {playerSel === "" && (
                        <button onClick={openModal} className="game__set">
                            Game Mode
                        </button>
                    )}
                </div>

                {showRules === true && (
                    <div className="rules__con">
                        <div className="rule__head">
                            <h2 className="rules">rules</h2>
                            <button
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
                        <button className="close__btn" onClick={toggleRule}>
                            <img src={closeIcon} alt="close" />
                        </button>
                    </div>
                )}
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
