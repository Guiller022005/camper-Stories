import { Home, DollarSign, Users, Settings, TrendingUp, Heart, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function Component() {
  const menuItems = [
    { icon: Home, label: "Inicio", active: true },
    { icon: DollarSign, label: "Donaciones" },
    { icon: Users, label: "Campers" },
    { icon: Settings, label: "Configuración" },
  ]

  const metrics = [
    {
      title: "Total Donado",
      value: "$1,234.56",
      change: "+20.1% del mes pasado",
      icon: DollarSign,
    },
    {
      title: "Campers Patrocinados",
      value: "12",
      change: "+2 del mes pasado",
      icon: Users,
    },
    {
      title: "Donaciones Este Mes",
      value: "$345.67",
      change: "+15% del mes pasado",
      icon: TrendingUp,
    },
    {
      title: "Impacto Total",
      value: "Alto",
      change: "¡Gracias por tu apoyo!",
      icon: Heart,
    },
  ]

  const donations = [
    { camper: "Juan Carlos Flórez", amount: "$100", date: "2023-05-01" },
    { camper: "Fabián Alexander Galán", amount: "$75", date: "2023-05-15" },
    { camper: "Kevin stiven Bueno Rojas", amount: "$150", date: "2023-06-01" },
    { camper: "Omar David Romero", amount: "$50", date: "2023-06-15" },
    { camper: "Dayana Hernandez", amount: "$200", date: "2023-07-01" },
  ]

  return (
    <div className="min-h-screen bg-[#0F0F2E] text-white">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#151544]">
        <h1 className="text-xl font-bold">Sponsor Dashboard</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-[#151544] border-r border-gray-800">
            <nav className="flex flex-col h-full">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    item.active ? "bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white" : "hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#151544] min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#7EE7FC] to-[#6366F1] bg-clip-text text-transparent">
              Sponsor Dashboard
            </h1>
          </div>
          <nav className="flex-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
                  item.active ? "bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white" : "hover:bg-[#1E1E4B]"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Bienvenido, Sponsor</h2>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-[#1E1E4B] border-gray-800 shadow-lg shadow-[#7EE7FC]/5">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#7EE7FC]">{metric.value}</div>
                  <p className="text-xs text-gray-400 mt-1">{metric.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Donations Table */}
          <Card className="bg-[#1E1E4B] border-gray-800">
            <CardHeader>
              <CardTitle>Historial de Donaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Camper</TableHead>
                      <TableHead className="text-gray-400">Monto</TableHead>
                      <TableHead className="text-gray-400">Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation, index) => (
                      <TableRow key={index} className="border-gray-800">
                        <TableCell>{donation.camper}</TableCell>
                        <TableCell>{donation.amount}</TableCell>
                        <TableCell>{donation.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

