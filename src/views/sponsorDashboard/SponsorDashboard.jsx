import React, { lazy, Suspense, useState, useEffect } from "react"
import { fetchCamperById } from "../../services/camperService"
import styles from "./styles/SponsorDashboard.module.css"
import LazySection from "../../components/common/LazySection"
import Loader from "@/components/common/Loader"

const NavbarProfile = lazy(() => import("../../components/navbar/NavbarProfile"))
const Footer = lazy(() => import("../../components/footer/Footer"))
const SponsorProfileHeader = lazy(() => import("../../components/dashboardSponsor/SponsorProfile"))
const Campers = lazy(() => import("../../components/campersMainPage/Campers"))
const VideoCarousel = lazy(() => import("../../components/dashboardSponsor/VideoCarrousel"))

const SponsorDashboard = () => {
  const [camperData, setCamperData] = useState({
    main_video_url: "",
    about: "",
    profile_picture: "",
    full_name: "",
    city: "",
    age: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const videos = [
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 1" },
    {
      url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ",
      title: "Video 2",
    },
    // ... más videos
  ]

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchCamperById(1) // Por ejemplo, camper con ID 1
        setCamperData(data)
      } catch (error) {
        console.error("Error loading camper data:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className={`${styles.sponsorDashboardView} flex flex-col relative`}>
      <LazySection>
        <NavbarProfile />
      </LazySection>
      <div className={`${styles.dashboardMainContent} flex flex-col gap-4`}>
        <LazySection>
          <div id="sponsor-profile-header">
            <SponsorProfileHeader data={camperData} initialMerits={[]} />
          </div>
        </LazySection>

        <LazySection>
          <div id="campers-section">
            <Campers />
          </div>
        </LazySection>

        <LazySection>
          <div id="video-carousel">
            <VideoCarousel videos={videos} />
          </div>
        </LazySection>
      </div>
      <LazySection>
        <Footer />
      </LazySection>
    </div>
  )
}

export default SponsorDashboard

