import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Aboutus from "./Aboutus";
import HomeContent from "./HomeContent";
import ContactModal from "./ContactModal"; // Import the ContactModal

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Navbar onContactClick={openModal} />
        <Hero />
        <HomeContent />
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
        <Footer />
      </div>
    </>
  );
}

export default Home;
