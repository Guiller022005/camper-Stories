import React, { lazy, Suspense, useState, useEffect } from "react"
import { fetchCamperById } from "../../services/camperService"
import LazySection from "../../components/common/LazySection"
import Loader from "@/components/common/Loader"

const NavbarProfile = lazy(() => import("../../components/navbar/NavbarProfile"))
const Footer = lazy(() => import("../../components/footer/Footer"))
const SponsorProfileHeader = lazy(() => import("../../components/dashboardSponsor/SponsorProfile"))
const Campers = lazy(() => import("../../components/campersMainPage/Campers"))
const VideoPlaylist = lazy(() => import("../../components/dashboardSponsor/VideoPlaylist"))

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
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 2" },
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 3" },
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 4" },
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 5" },
    { url: "https://youtu.be/OKMsheDmK8Q?list=TLGGumSk0QQF7LcyOTAxMjAyNQ", title: "Video 6" },
  ]

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchCamperById(60)
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
    <div className="flex flex-col relative min-h-screen bg-[#07072b]">
      <LazySection>
        <NavbarProfile />
      </LazySection>
      <div className="flex flex-col">
        <LazySection>
          <div id="sponsor-profile-header">
            <SponsorProfileHeader data={camperData} initialMerits={[]} />
          </div>
        </LazySection>

        <LazySection>
  <div id="campers-section">
    <Campers 
      title="Auspiciados!" 
      subtitle="Gracias a ti ellos terminaron su formacion"
    />
  </div>
</LazySection>

        <LazySection>
          <div id="video-carousel">
            <VideoPlaylist videos={videos} />
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