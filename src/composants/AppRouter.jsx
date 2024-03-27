import Creatures  from "./Creatures/Creatures.jsx";
import CreaturesDetail from "./CreaturesDetail/CreaturesDetail.jsx";
import MonstersList from "./Monsters/MonstersList.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const AppRouter = () => {
    return (
        <div>
            <Router>
                    <Routes>
                        <Route path="/Monsters" element={<MonstersList />} />
                        <Route path="/Creatures" element={<Creatures />} />
                        <Route path="/Creatures/:id" element={<CreaturesDetail />} />
                        {/* <Route path="/" element={<CreaturesItem name={name} />} /> */}
                        {/* <route path="/*" /> */}
                    </Routes>
            </Router>
        </div>
    );
};


export default AppRouter;