import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BedDouble, 
  CalendarCheck, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Users
} from 'lucide-react';
import { bookings, rooms, formatCurrency } from '@/data/mockData';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Calculate stats
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
  
  const todayCheckIns = bookings.filter(b => b.checkIn === today);
  const todayCheckOuts = bookings.filter(b => b.checkOut === today);
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  
  const todayRevenue = bookings
    .filter(b => b.createdAt === today)
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      change: '+5%',
      trend: 'up',
      icon: BedDouble,
      description: `${occupiedRooms} of ${totalRooms} rooms`
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(todayRevenue),
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs yesterday'
    },
    {
      title: 'Pending Bookings',
      value: pendingBookings.length.toString(),
      change: pendingBookings.length > 0 ? 'Action needed' : 'All clear',
      trend: pendingBookings.length > 0 ? 'down' : 'up',
      icon: CalendarCheck,
      description: 'awaiting approval'
    },
    {
      title: 'Total Bookings',
      value: bookings.length.toString(),
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      description: 'this month'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'pending': 'secondary',
      'confirmed': 'default',
      'checked-in': 'default',
      'checked-out': 'outline',
      'cancelled': 'destructive'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-primary text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-primary-foreground/80">
            Here's what's happening at your hotel today, {format(new Date(), 'EEEE, MMMM d, yyyy')}.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Today's Activity</CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Check-ins</p>
                      <p className="text-sm text-muted-foreground">Expected arrivals today</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{todayCheckIns.length}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <ArrowDownRight className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Check-outs</p>
                      <p className="text-sm text-muted-foreground">Expected departures today</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{todayCheckOuts.length}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">In-house Guests</p>
                      <p className="text-sm text-muted-foreground">Currently staying</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">
                    {bookings.filter(b => b.status === 'checked-in').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Pending Bookings</CardTitle>
              <Badge variant="secondary">{pendingBookings.length} pending</Badge>
            </CardHeader>
            <CardContent>
              {pendingBookings.length > 0 ? (
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.roomType} • {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">Reject</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Bookings</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Guest</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Room</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Dates</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{booking.id}</td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium">{booking.guestName}</p>
                        <p className="text-xs text-muted-foreground">{booking.guestEmail}</p>
                      </td>
                      <td className="py-3 px-4 text-sm">{booking.roomType}</td>
                      <td className="py-3 px-4 text-sm">
                        {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d')}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{formatCurrency(booking.totalPrice)}</td>
                      <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
