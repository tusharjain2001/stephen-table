import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Nominate from './pages/Nominate.jsx';
import GetInvolved from './pages/GetInvolved.jsx';
import ImpactStories from './pages/ImpactStories.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx';
import Donation from './pages/Donation.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="nominate" element={<Nominate />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="impact-stories" element={<ImpactStories />} />
        <Route path="stories/helping-seniors-age-safely" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="donation" element={<Donation />} />
      </Route>
    </Routes>
  );
}

export default App;
