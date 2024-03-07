import Game from "../components/Game";

export default function Home() {
    return (
        <div>
            <nav>
                <p style={{fontSize: 50, fontWeight: "800"}}>Hockey Connections</p>
            </nav>
            <Game />
        </div>
    )
}