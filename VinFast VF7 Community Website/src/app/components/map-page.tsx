import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Search, Zap, Wrench, Coffee, Phone, Navigation, Star, X, MapPin, Plus, User, CheckCircle, Image as ImageIcon, ThumbsUp, RotateCcw, BedDouble, Utensils, HelpCircle, ChevronDown, MoreHorizontal } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';
import { chargingStations } from '../data/stations';

// Component to handle map actions like flying to location
function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

// Component to handle map clicks
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function MapPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [externalLocations, setExternalLocations] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewCaptcha, setReviewCaptcha] = useState(false);

  // Suggest form state
  const [suggestName, setSuggestName] = useState('');
  const [suggestAddress, setSuggestAddress] = useState('');
  const [suggestCoords, setSuggestCoords] = useState('');
  const [suggestType, setSuggestType] = useState('charging');
  const [suggestNotes, setSuggestNotes] = useState('');
  const [suggestProposerName, setSuggestProposerName] = useState('');
  const [suggestProposerPhone, setSuggestProposerPhone] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'charging':
        return Zap;
      case 'garage':
        return Wrench;
      case 'meetup':
        return Coffee;
      case 'hotel':
        return BedDouble;
      case 'food':
        return Utensils;
      case 'other':
        return HelpCircle;
      default:
        return MapPin;
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'charging':
        return '#2ECC71';
      case 'garage':
        return '#1A73E8';
      case 'meetup':
        return '#00D2D3';
      case 'hotel':
        return '#9B59B6'; // Purple for hotels
      case 'food':
        return '#E67E22'; // Orange for food
      case 'other':
        return '#95A5A6'; // Gray for other
      default:
        return '#1A73E8';
    }
  };

  const createCustomIcon = (type: string) => {
    const color = getMarkerColor(type);
    const iconHtml = `
      <div style="
        width: 40px;
        height: 40px;
        background-color: ${color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        cursor: pointer;
      ">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          ${type === 'charging'
        ? '<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>'
        : type === 'garage'
          ? '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>'
          : type === 'meetup'
            ? '<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>'
            : type === 'hotel'
              ? '<path d="M2 20h20"></path><path d="M2 4v16"></path><path d="M22 4v16"></path><path d="M2 14h20"></path>'
              : type === 'food'
                ? '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>'
                : '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>'
      }
        </svg>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  const allLocations = [...chargingStations, ...externalLocations];

  const filteredLocations = allLocations.filter((location) => {
    // Basic filtering without keyword search if suggestions are active
    const matchesType = selectedType === 'all' || location.type === selectedType || (selectedType === 'other' && location.type === 'other');
    const matchesSearch =
      searchQuery === '' ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Debounced search for external locations (Suggestions)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 2) {
        // Only search externally if it's likely not in our static list
        const hasLocalMatch = chargingStations.some(l =>
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Still fetch external suggestions to give more options
        setIsSearching(true);
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
          const data = await response.json();

          const newSuggestions: Location[] = data.map((item: any) => ({
            id: Date.now() + Math.random(),
            name: item.display_name.split(',')[0],
            type: 'other',
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            address: item.display_name,
            phone: '',
            rating: 0,
            distance: '',
          }));

          setSuggestions(newSuggestions);
        } catch (error) {
          console.error("Error searching location:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        () => {
          alert("Không thể lấy vị trí của bạn.");
        }
      );
    } else {
      alert("Trình duyệt không hỗ trợ định vị.");
    }
  };

  const handleRefresh = () => {
    setSelectedType('all');
    setSearchQuery('');
    setSelectedLocation(null);
    setMapCenter([21.0285, 105.8542]); // Reset to default center (Hanoi)
    setExternalLocations([]); // Clear suggested/custom locations
    setShowSidebar(true);
    setShowMoreFilters(false);
  };

  const handleMapClick = (lat: number, lng: number) => {
    // Add a temporary marker for the clicked location
    const newLocation: Location = {
      id: Date.now(),
      name: 'Vị trí đã chọn',
      type: 'other',
      lat: lat,
      lng: lng,
      address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      phone: '',
      rating: 0,
      distance: '',
    };
    setExternalLocations(prev => [...prev, newLocation]);
    setSelectedLocation(newLocation);
    setMapCenter([lat, lng]);
    if (!showSidebar) setShowSidebar(true);
  };

  const handleMarkerClick = (location: Location) => {
    if (selectedLocation?.id === location.id) {
      // Deselect
      setSelectedLocation(null);
      // If it's a generic/other location, remove it
      if (location.type === 'other') {
        setExternalLocations(prev => prev.filter(l => l.id !== location.id));
      }
    } else {
      // Select
      setSelectedLocation(location);
      if (!showSidebar) setShowSidebar(true);
    }
  };

  const handleSuggestionClick = (location: Location) => {
    setExternalLocations(prev => [...prev, location]);
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    if (!showSidebar) setShowSidebar(true);
    setSuggestions([]); // Clear suggestions
    setSearchQuery(''); // Clear search query or keep location name? keeping clean for now
  };

  const handleSuggestCurrentLocation = () => {
    if (selectedLocation) {
      setSuggestName(selectedLocation.name === 'Vị trí đã chọn' ? '' : selectedLocation.name);
      setSuggestAddress(selectedLocation.address);
      setSuggestCoords(`${selectedLocation.lat}, ${selectedLocation.lng}`);
      setSuggestType('other'); // Default or try to infer?
      setSuggestNotes('');
      setSuggestProposerName('');
      setSuggestProposerPhone('');
      setShowRecommendModal(true);
    }
  };


  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewCaptcha) {
      alert("Vui lòng xác thực bạn không phải là robot.");
      return;
    }
    // Logic to submit review (mockup)
    alert("Cảm ơn đánh giá của bạn!");
    setReviewName('');
    setReviewContent('');
    setSelectedLocation(prev => prev ? {
      ...prev,
      reviews: [...(prev.reviews || []), { id: Date.now(), user: reviewName, rating: reviewRating, content: reviewContent, date: new Date().toISOString().split('T')[0] }]
    } : null);
  };

  return (
    <div className="fixed inset-0 top-16 flex">
      {/* Sidebar */}
      <div
        className={`${showSidebar ? 'w-full md:w-[400px]' : 'w-0'
          } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden z-[1000]`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#2D3436]">
              {selectedLocation ? 'Chi tiết địa điểm' : 'Bản đồ dịch vụ'}
            </h2>
            {selectedLocation && (
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-sm text-blue-600 hover:underline"
              >
                Quay lại
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selectedLocation ? (
            // Detail View
            <div className="space-y-6">
              {/* Info */}
              <div>
                {selectedLocation.image ? (
                  <img src={selectedLocation.image} alt={selectedLocation.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#2D3436] mb-2">{selectedLocation.name}</h3>
                <p className="text-gray-600 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedLocation.address}</p>

                {selectedLocation.rating ? (
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{selectedLocation.rating}</span>
                    {selectedLocation.distance && <><span>•</span><span>{selectedLocation.distance}</span></>}
                  </div>
                ) : (
                  <div className="mb-4"></div>
                )}


                <div className="grid grid-cols-2 gap-4 mb-4">
                  {selectedLocation.price && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 font-semibold uppercase">Giá dịch vụ</p>
                      <p className="font-medium">{selectedLocation.price}</p>
                    </div>
                  )}
                  {selectedLocation.chargingPorts && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 font-semibold uppercase">Cổng sạc</p>
                      <p className="font-medium">{selectedLocation.chargingPorts.join(', ')}</p>
                    </div>
                  )}
                </div>

                {selectedLocation.amenities && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Tiện ích</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.amenities.map(amenity => (
                        <span key={amenity} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 bg-[#1A73E8] text-white rounded-lg text-sm font-medium hover:bg-[#1557b0] transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Chỉ đường
                  </a>

                  {/* Suggest Button for Custom Locations */}
                  <button
                    onClick={handleSuggestCurrentLocation}
                    className="w-full px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Đề xuất địa điểm này
                  </button>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Reviews List */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  Đánh giá <span className="text-gray-400 text-sm font-normal">({selectedLocation.reviews?.length || 0})</span>
                </h4>
                <div className="space-y-4 mb-6">
                  {selectedLocation.reviews && selectedLocation.reviews.length > 0 ? (
                    selectedLocation.reviews.map(review => (
                      <div key={review.id} className="bg-gray-50 p-3 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="font-semibold text-sm">{review.user}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.content}</p>
                        <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-4">Chưa có đánh giá nào.</p>
                  )}
                </div>
              </div>

              {/* Add Review Form */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h4 className="font-bold mb-3">Viết đánh giá</h4>
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Họ tên</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Nhập tên của bạn"
                      value={reviewName}
                      onChange={e => setReviewName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Đánh giá</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`w-6 h-6 ${star <= reviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Nội dung</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="Chia sẻ trải nghiệm của bạn..."
                      value={reviewContent}
                      onChange={e => setReviewContent(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    <input
                      type="checkbox"
                      id="captcha"
                      checked={reviewCaptcha}
                      onChange={e => setReviewCaptcha(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="captcha" className="text-sm text-gray-600 select-none cursor-pointer">Tôi không phải là người máy</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#1A73E8] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Gửi đánh giá
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // List View (Filtered Locations)

            <div className="space-y-3">
              {filteredLocations.map((location) => {
                const Icon = getIcon(location.type);
                return (
                  <div
                    key={location.id}
                    onClick={() => {
                      setSelectedLocation(location);
                      setMapCenter([location.lat, location.lng]);
                    }}
                    className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1A73E8] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: getMarkerColor(location.type) + '20' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: getMarkerColor(location.type) }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-[#2D3436] truncate">{location.name}</h3>
                          {location.status && (
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full ${location.status === 'available'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                                }`}
                            >
                              {location.status === 'available' ? 'Trống' : 'Bận'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                        {location.rating && (
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span>{location.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{location.distance}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="absolute top-4 left-4 z-[1001] px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Search className="w-5 h-5" />
          </button>
        )}

        {/* Search & Filters Overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1002] w-max max-w-[98vw] px-2 flex flex-col items-center gap-2 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-2 pr-4 rounded-2xl shadow-xl flex items-center gap-2 border border-blue-50/50 pointer-events-auto relative">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1A73E8] transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-28 sm:w-40 md:w-64 pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none text-[#2D3436] placeholder-gray-400"
              />

              {/* Search Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[1003]">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#2D3436] truncate">{suggestion.name}</p>
                        <p className="text-xs text-gray-500 truncate">{suggestion.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-8 bg-gray-200 mx-2"></div>

            {/* Filters */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setSelectedType('all'); setShowMoreFilters(false); }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedType === 'all'
                  ? 'bg-[#1A73E8] text-white shadow-md shadow-blue-500/20'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => { setSelectedType('charging'); setShowMoreFilters(false); }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${selectedType === 'charging'
                  ? 'bg-[#2ECC71] text-white shadow-md shadow-green-500/20'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Trạm sạc</span>
              </button>
              <button
                onClick={() => { setSelectedType('garage'); setShowMoreFilters(false); }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${selectedType === 'garage'
                  ? 'bg-[#1A73E8] text-white shadow-md shadow-blue-500/20'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Wrench className="w-4 h-4" />
                <span className="hidden sm:inline">Gara</span>
              </button>
              <button
                onClick={() => { setSelectedType('meetup'); setShowMoreFilters(false); }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${selectedType === 'meetup'
                  ? 'bg-[#00D2D3] text-white shadow-md shadow-cyan-500/20'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Coffee className="w-4 h-4" />
                <span className="hidden sm:inline">Meetup</span>
              </button>

              {/* More / Other Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${['hotel', 'food', 'other'].includes(selectedType)
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Khác</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showMoreFilters && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[1010]">
                    <div className="p-1.5 space-y-1">
                      <button
                        onClick={() => { setSelectedType('hotel'); setShowMoreFilters(false); }}
                        className={`w-full px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${selectedType === 'hotel'
                          ? 'bg-[#9B59B6]/10 text-[#9B59B6]'
                          : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        <BedDouble className="w-4 h-4" />
                        <span>Lưu trú</span>
                        {selectedType === 'hotel' && <CheckCircle className="w-3 h-3 ml-auto" />}
                      </button>
                      <button
                        onClick={() => { setSelectedType('food'); setShowMoreFilters(false); }}
                        className={`w-full px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${selectedType === 'food'
                          ? 'bg-[#E67E22]/10 text-[#E67E22]'
                          : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        <Utensils className="w-4 h-4" />
                        <span>Ăn uống</span>
                        {selectedType === 'food' && <CheckCircle className="w-3 h-3 ml-auto" />}
                      </button>
                      <button
                        onClick={() => { setSelectedType('other'); setShowMoreFilters(false); }}
                        className={`w-full px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${selectedType === 'other'
                          ? 'bg-[#95A5A6]/10 text-[#7f8c8d]'
                          : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Mục khác</span>
                        {selectedType === 'other' && <CheckCircle className="w-3 h-3 ml-auto" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Controls - Suggest, Refresh, Locate */}
        <div className="absolute bottom-6 right-4 z-[1001] flex flex-col gap-3 items-end">
          <button
            onClick={handleRefresh}
            className="w-12 h-12 bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-blue-200/50 flex items-center justify-center group"
            title="Làm mới bản đồ"
          >
            <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
          </button>

          <button
            onClick={handleLocateUser}
            className="w-12 h-12 bg-gradient-to-br from-[#1A73E8] to-[#00D2D3] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-blue-200/50 flex items-center justify-center group"
            title="Vị trí của tôi"
          >
            <MapPin className="w-6 h-6 group-hover:animate-bounce" />
          </button>

          <button
            onClick={() => setShowRecommendModal(true)}
            className="flex items-center gap-2 pl-4 pr-5 py-3 bg-gradient-to-r from-[#1A73E8] to-[#00D2D3] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group mt-1"
            title="Đề xuất địa điểm"
          >
            <div className="bg-white/20 p-1.5 rounded-full">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm">Đề xuất địa điểm</span>
          </button>
        </div>

        {/* Recommend Modal */}
        {showRecommendModal && (
          <div className="fixed inset-0 z-[1100] bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[70vh] overflow-y-auto p-6 shadow-2xl animate-in fade-in zoom-in duration-200 custom-scrollbar">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Đề xuất địa điểm mới</h3>
                <button onClick={() => setShowRecommendModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Cảm ơn đề xuất của bạn! Chúng tôi sẽ xem xét sớm.");
                  setShowRecommendModal(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên địa điểm</label>
                  <input
                    type="text"
                    value={suggestName}
                    onChange={(e) => setSuggestName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    placeholder="VD: Trạm sạc mới..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    value={suggestAddress}
                    onChange={(e) => setSuggestAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                    placeholder="VD: 123 Đường ABC..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tọa độ vị trí chính xác (nếu có)</label>
                  <input
                    type="text"
                    value={suggestCoords}
                    onChange={(e) => setSuggestCoords(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="VD: 21.0285, 105.8542"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại hình</label>
                  <select
                    value={suggestType}
                    onChange={(e) => setSuggestType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="charging">Trạm sạc</option>
                    <option value="garage">Gara</option>
                    <option value="meetup">Meetup Cafe</option>
                    <option value="hotel">Nhà nghỉ / Khách sạn</option>
                    <option value="food">Đồ ăn / Đồ uống</option>
                    <option value="other">Mục khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú thêm</label>
                  <textarea
                    value={suggestNotes}
                    onChange={(e) => setSuggestNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh / Tài liệu</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Tải lên tệp</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">hoặc kéo thả vào đây</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF lên đến 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl space-y-3">
                  <h4 className="font-semibold text-blue-800 text-sm">Thông tin người đề xuất (Tùy chọn)</h4>
                  <p className="text-xs text-blue-600">
                    * Thông tin này giúp chúng tôi gửi lời cảm ơn đến bạn khi địa điểm được duyệt và xuất hiện trên bản đồ.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        value={suggestProposerName}
                        onChange={(e) => setSuggestProposerName(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                        placeholder="Họ và tên của bạn"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={suggestProposerPhone}
                        onChange={(e) => setSuggestProposerPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                        placeholder="Số điện thoại"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-3 bg-[#1A73E8] text-white rounded-lg font-bold hover:bg-blue-600 transition-colors">
                  Gửi đề xuất
                </button>
              </form>
            </div>
          </div>
        )}

        <MapContainer
          center={[21.0285, 105.8542]}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
          className="z-0"
        >
          <MapController center={mapCenter} />
          <MapClickHandler onMapClick={handleMapClick} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Location Marker */}
          {userLocation && (
            <Marker position={userLocation} icon={L.divIcon({
              html: `<div style="width: 24px; height: 24px; background: #3B82F6; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);"></div>`,
              className: 'user-location-marker',
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}>
              <Popup>Bạn đang ở đây</Popup>
            </Marker>
          )}

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(location.type)}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(location);
                },
              }}
            >
              <Popup closeButton={false} className="custom-leaflet-popup">
                <div className="p-4 min-w-[250px]">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-[#2D3436] pr-4">{location.name}</h3>
                    <button
                      onClick={() => handleMarkerClick(location)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{location.address}</p>
                  {location.rating && (
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{location.rating}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{location.distance}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-[#1A73E8] text-white rounded-lg text-sm font-medium hover:bg-[#1557b0] transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Chỉ đường
                    </a>
                    {location.phone && (
                      <a
                        href={`tel:${location.phone}`}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
