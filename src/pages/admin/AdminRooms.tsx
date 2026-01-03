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
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  BedDouble,
  Filter
} from 'lucide-react';
import { rooms, roomTypes, Room } from '@/data/mockData';

const AdminRooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesType = typeFilter === 'all' || room.roomTypeId === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getRoomTypeName = (roomTypeId: string) => {
    return roomTypes.find(rt => rt.id === roomTypeId)?.name || 'Unknown';
  };

  const getStatusBadge = (status: Room['status']) => {
    const variants: Record<Room['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      'available': { variant: 'default', label: 'Available' },
      'occupied': { variant: 'secondary', label: 'Occupied' },
      'reserved': { variant: 'outline', label: 'Reserved' },
      'maintenance': { variant: 'destructive', label: 'Maintenance' },
      'cleaning': { variant: 'outline', label: 'Cleaning' }
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const statusCounts = {
    all: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    reserved: rooms.filter(r => r.status === 'reserved').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Room Management</h1>
            <p className="text-muted-foreground">Manage all rooms and their status</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>
                  This feature requires Cloud integration for database storage.
                </DialogDescription>
              </DialogHeader>
              <div className="py-8 text-center text-muted-foreground">
                <BedDouble className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enable Cloud to add and manage rooms in the database.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { status: 'all', label: 'All Rooms', color: 'bg-primary' },
            { status: 'available', label: 'Available', color: 'bg-green-500' },
            { status: 'occupied', label: 'Occupied', color: 'bg-blue-500' },
            { status: 'reserved', label: 'Reserved', color: 'bg-yellow-500' },
            { status: 'maintenance', label: 'Maintenance', color: 'bg-red-500' },
            { status: 'cleaning', label: 'Cleaning', color: 'bg-orange-500' },
          ].map((item) => (
            <Card 
              key={item.status} 
              className={`cursor-pointer transition-all ${statusFilter === item.status ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setStatusFilter(item.status)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold">{statusCounts[item.status as keyof typeof statusCounts]}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search room number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {roomTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rooms ({filteredRooms.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Room #</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Floor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <BedDouble className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{room.number}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">Floor {room.floor}</td>
                      <td className="py-3 px-4 text-sm">{getRoomTypeName(room.roomTypeId)}</td>
                      <td className="py-3 px-4">{getStatusBadge(room.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Select 
                            value={room.status} 
                            onValueChange={(value) => {
                              // In real app, this would update the database
                              console.log('Update room', room.id, 'to', value);
                            }}
                          >
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="occupied">Occupied</SelectItem>
                              <SelectItem value="reserved">Reserved</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
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

export default AdminRooms;
