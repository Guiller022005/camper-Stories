import { useNavigate } from "react-router-dom"
import VideoPlayer from "./VIdeoPlayer"
import AboutMeModal from "./modals/AboutMeModal"

const AboutMe = ({ isEditable, videoUrl, about, camperInfoInitialData, onUpdate }) => {
  const navigate = useNavigate()

  const handleSponsorClick = () => {
    if (location.pathname === "/") {
      const section = document.getElementById("sponsro")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      navigate("/")
      setTimeout(() => {
        const section = document.getElementById("sponsro")
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
      }, 500)
    }
  }

  return (
    <section className="py-8 w-full">
      <div className="grid gap-8 w-full max-w-[1400px] mx-auto xl:grid-cols-[minmax(300px,_60%)_minmax(250px,_40%)] sm:place-items-center lg:place-items-start">
        <div className="w-full min-w-[300px] max-w-[800px] xl:max-w-full">
          <VideoPlayer videoUrl={videoUrl} title="Historia Camper" />
        </div>
        <div className="flex flex-col gap-4 p-4 min-w-[250px] max-w-full xl:p-0 xl:max-w-full">
          <h2 className="font-poppins font-bold text-white text-[1.5rem] mb-4">
            Acerca de
            {isEditable && <AboutMeModal initialData={camperInfoInitialData} onUpdate={onUpdate} />}
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[300px] xl:max-h-none">
            <p className="text-white m-0 leading-relaxed">{about}</p>
          </div>
          {!isEditable && (
            <button
              className="self-start bg-[#f7b500] text-black font-poppins font-semibold uppercase rounded-[20px] px-8 py-3 border-none cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#f0a500]"
              onClick={handleSponsorClick}
            >
              Patrocinar
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default AboutMe

