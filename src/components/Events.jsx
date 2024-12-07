import React, { useState, useEffect } from 'react';
import TopSlider from './TopSlider';
import Search from './Search';
import EventList from './EventList';

const images = [
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/tkwokqxsgj6rgpso94jo.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/klwjnhtdi8ftizuchzjr.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/ew0ven2w1xaj6ayxs75w.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037786/obanbfiwfurp1wbbp3i6.png'
];

const htmlContent = [
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h2 className="text-4xl font-bold text-white tracking-wide">Discover Amazing Events</h2>
    </div>,
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h2 className="text-4xl font-bold text-white tracking-wide">Connect With Your Community</h2>
    </div>,
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h2 className="text-4xl font-bold text-white tracking-wide">Join Exciting Activities</h2>
    </div>,
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h2 className="text-4xl font-bold text-white tracking-wide">Create Lasting Memories</h2>
    </div>
];

function Events() {
    const [events, setEvents] = useState([]);
    const [eventsNearYou, setEventsNearYou] = useState([]);
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [yourCampusEvents, setYourCampusEvents] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                };

                const fetchSection = async (section) => {
                    const response = await fetch(`http://localhost:3000/events?section=${section}`, { 
                        method: 'GET', 
                        headers 
                    });
                    if (!response.ok) throw new Error(`Failed to fetch ${section} events`);
                    return (await response.json()).events;
                };

                const [nearYou, recommended, yourCampus] = await Promise.all([
                    fetchSection('near-you'),
                    fetchSection('recommended'),
                    fetchSection('your-campus')
                ]);

                setEventsNearYou(nearYou);
                setRecommendedEvents(recommended);
                setYourCampusEvents(yourCampus);
                console.log(recommendedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventSearch = async (query) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/events?search=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) throw new Error('Search failed');
            const { events: searchResults } = await response.json();
            setEvents(searchResults);
            setIsSearched(true);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleGoBack = () => {
        setShowAll(false);
        setSelectedCategory(null);
        setIsSearched(false);
    };

    const getCurrentEvents = () => {
        switch(selectedCategory) {
            case 'near-you':
                return eventsNearYou;
            case 'recommended':
                return recommendedEvents;
            case 'your-campus':
                return yourCampusEvents;
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative">
                <TopSlider images={images} captions={[]} htmlContent={htmlContent} />
            </div>
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto mb-8">
                    <Search onSearch={handleEventSearch} />
                </div>

                <div className="space-y-12">
                    {!showAll && !isSearched ? (
                        <>
                            <EventList
                                title="Events Near You"
                                events={eventsNearYou.slice(0, 5)}
                                onSeeAll={() => {
                                    setShowAll(true);
                                    setSelectedCategory('near-you');
                                }}
                                isAll={false}
                            />
                            <EventList
                                title="Recommended"
                                events={recommendedEvents.slice(0, 5)}
                                
                                onSeeAll={() => {
                                    setShowAll(true);
                                    setSelectedCategory('recommended');
                                }}
                                isAll={false}
                            />
                            <EventList
                                title="Your Campus"
                                events={yourCampusEvents.slice(0, 5)}
                                onSeeAll={() => {
                                    setShowAll(true);
                                    setSelectedCategory('your-campus');
                                }}
                                isAll={false}
                            />
                        </>
                    ) : !showAll && isSearched ? (
                        <EventList
                            title="Search Results"
                            events={events}
                            onGoBack={handleGoBack}
                            isAll={true}
                        />
                    ) : (
                        <EventList
                            title={selectedCategory ? 
                                `All ${selectedCategory.split('-').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')} Events` : 
                                'All Events'
                            }
                            events={getCurrentEvents()}
                            onGoBack={handleGoBack}
                            isAll={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Events;