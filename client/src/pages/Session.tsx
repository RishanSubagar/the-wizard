import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket"

export default function Session() {
    const { code } = useParams();
    const [players, setPlayers] = useState(0);

    useEffect(() => {
        socket.on("plaer-joined", ({ players }: {players: number}) => {
            setPlayers(players);
        });

        return () => {
            socket.off("player-joined");
        };
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h2>Session Code: {code}</h2>
            <p>Players connected: {players}</p>
        </div>
    )
}