import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DoorEntrance } from './components/DoorEntrance';
import { MainRoom } from './components/MainRoom';
import { Simulator } from './components/Simulator';
import { MapPage } from './components/Map';
import { About } from './components/About';
import { Stories } from './components/Stories';
import { Artifacts } from './components/Artifacts'; // <-- импортируем Artifacts

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <Router>
      <Routes>
        {!hasEntered ? (
          <Route path="*" element={<DoorEntrance onEnter={() => setHasEntered(true)} />} />
        ) : (
          <>
            <Route path="/" element={<MainRoom />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/artifacts" element={<Artifacts />} /> {/* <-- добавляем путь для артефактов */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
