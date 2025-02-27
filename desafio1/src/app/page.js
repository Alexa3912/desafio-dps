"use client";
import React, { useState } from "react";
import ListaClases from "../components/ListaClases";
import ReservaClase from "../components/ReservaClase";
import ResumenReserva from "../components/ResumenReserva";

const Page = () => {
  const [clases, setClases] = useState([
    { id: 1, nombre: "Yoga", horario: "8:00 AM", cupos: 5 },
    { id: 2, nombre: "Spinning", horario: "10:00 AM", cupos: 3 },
    { id: 3, nombre: "Pesas", horario: "6:00 PM", cupos: 8 }
  ]);

  const [reservas, setReservas] = useState([]);

  const reservarClase = (id) => {
    setClases((prevClases) =>
      prevClases.map((clase) =>
        clase.id === id && clase.cupos > 0
          ? { ...clase, cupos: clase.cupos - 1 }
          : clase
      )
    );
    const claseReservada = clases.find((clase) => clase.id === id);
    if (claseReservada && !reservas.some((r) => r.id === id)) {
      setReservas([...reservas, claseReservada]);
    }
  };

  const cancelarReserva = (id) => {
    setReservas(reservas.filter((reserva) => reserva.id !== id));
    setClases((prevClases) =>
      prevClases.map((clase) =>
        clase.id === id ? { ...clase, cupos: clase.cupos + 1 } : clase
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1>Reserva de Clases en el Gimnasio</h1>
      <ListaClases clases={clases} reservarClase={reservarClase} />
      <ReservaClase reservas={reservas} cancelarReserva={cancelarReserva} />
      <ResumenReserva reservas={reservas} />
    </div>
  );
};

export default Page;