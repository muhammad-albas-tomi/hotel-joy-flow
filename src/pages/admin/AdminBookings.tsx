import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter,
  Eye,
  Printer,
  Check,
  X,
  CalendarCheck
} from 'lucide-react';
import { bookings, formatCurrency, Booking } from '@/data/mockData';
import { format } from 'date-fns';

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Booking['status']) => {
    const variants: Record<Booking['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      'pending': { variant: 'secondary', label: 'Pending' },
      'confirmed': { variant: 'default', label: 'Confirmed' },
      'checked-in': { variant: 'default', label: 'Checked In' },
      'checked-out': { variant: 'outline', label: 'Checked Out' },
      'cancelled': { variant: 'destructive', label: 'Cancelled' }
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const statusTabs = [
    { value: 'all', label: 'All', count: bookings.length },
    { value: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { value: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { value: 'checked-in', label: 'Checked In', count: bookings.filter(b => b.status === 'checked-in').length },
    { value: 'checked-out', label: 'Checked Out', count: bookings.filter(b => b.status === 'checked-out').length },
    { value: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground">View and manage all reservations</p>
        </div>

        {/* Tabs */}
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList className="flex-wrap h-auto gap-2">
            {statusTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                {tab.label}
                <Badge variant="secondary" className="ml-1">{tab.count}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by booking ID, guest name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookings ({filteredBookings.length})</CardTitle>
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
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono">{booking.id}</td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium">{booking.guestName}</p>
                        <p className="text-xs text-muted-foreground">{booking.guestEmail}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm">{booking.roomType}</p>
                        <p className="text-xs text-muted-foreground">Room {booking.roomNumber}</p>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {format(new Date(booking.checkIn), 'MMM d')} - {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{formatCurrency(booking.totalPrice)}</td>
                      <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                                <DialogDescription>Booking #{booking.id}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Guest Name</p>
                                    <p className="font-medium">{booking.guestName}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Status</p>
                                    {getStatusBadge(booking.status)}
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Email</p>
                                    <p className="font-medium">{booking.guestEmail}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Phone</p>
                                    <p className="font-medium">{booking.guestPhone}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Room Type</p>
                                    <p className="font-medium">{booking.roomType}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Room Number</p>
                                    <p className="font-medium">{booking.roomNumber}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Check-in</p>
                                    <p className="font-medium">{format(new Date(booking.checkIn), 'MMM d, yyyy')}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Check-out</p>
                                    <p className="font-medium">{format(new Date(booking.checkOut), 'MMM d, yyyy')}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Guests</p>
                                    <p className="font-medium">{booking.adults} Adults, {booking.children} Children</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Total Amount</p>
                                    <p className="font-medium text-primary">{formatCurrency(booking.totalPrice)}</p>
                                  </div>
                                </div>
                                {booking.specialRequests && (
                                  <div>
                                    <p className="text-muted-foreground text-sm">Special Requests</p>
                                    <p className="text-sm bg-muted p-3 rounded-lg mt-1">{booking.specialRequests}</p>
                                  </div>
                                )}
                                <div className="flex gap-2 pt-4">
                                  <Button variant="outline" className="flex-1">
                                    <Printer className="h-4 w-4 mr-2" />
                                    Print Invoice
                                  </Button>
                                  {booking.status === 'confirmed' && (
                                    <Button className="flex-1">
                                      <Check className="h-4 w-4 mr-2" />
                                      Check In
                                    </Button>
                                  )}
                                  {booking.status === 'checked-in' && (
                                    <Button className="flex-1">
                                      <Check className="h-4 w-4 mr-2" />
                                      Check Out
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <CalendarCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No bookings found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
