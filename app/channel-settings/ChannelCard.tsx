import React, { FC, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
interface ChannelCardProps {
    channel: {
        key: string;
        name: string;
        status: 'connected' | 'not_connected';
        lastConnected: string | null;
    };
}

const channelIcons: Record<string, React.ReactNode> = {
    'website-chat': (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99984 18.3332C14.6022 18.3332 18.3332 14.6022 18.3332 9.99984C18.3332 5.39746 14.6022 1.6665 9.99984 1.6665C5.39746 1.6665 1.6665 5.39746 1.6665 9.99984C1.6665 14.6022 5.39746 18.3332 9.99984 18.3332Z" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.99984 1.6665C7.86003 3.9133 6.6665 6.89712 6.6665 9.99984C6.6665 13.1026 7.86003 16.0864 9.99984 18.3332C12.1396 16.0864 13.3332 13.1026 13.3332 9.99984C13.3332 6.89712 12.1396 3.9133 9.99984 1.6665Z" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.6665 10H18.3332" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'whatsapp': (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.58317 15.6669C8.17365 16.4827 10.0032 16.7037 11.7422 16.29C13.4812 15.8763 15.0153 14.8551 16.068 13.4104C17.1206 11.9656 17.6227 10.1925 17.4837 8.41034C17.3446 6.62821 16.5737 4.95434 15.3097 3.69036C14.0457 2.42638 12.3718 1.65541 10.5897 1.51638C8.80758 1.37735 7.0344 1.87941 5.58969 2.93207C4.14498 3.98474 3.12375 5.51879 2.71002 7.2578C2.2963 8.9968 2.51729 10.8264 3.33317 12.4169L1.6665 17.3335L6.58317 15.6669Z" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'facebook-messenger': (
        <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0002 1.6665H7.50016C6.39509 1.6665 5.33529 2.10549 4.55388 2.88689C3.77248 3.66829 3.3335 4.7281 3.3335 5.83317V8.33317H0.833496V11.6665H3.3335V18.3332H6.66683V11.6665H9.16683L10.0002 8.33317H6.66683V5.83317C6.66683 5.61216 6.75463 5.4002 6.91091 5.24391C7.06719 5.08763 7.27915 4.99984 7.50016 4.99984H10.0002V1.6665Z" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    'instagram-dms': (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1665 1.6665H5.83317C3.53198 1.6665 1.6665 3.53198 1.6665 5.83317V14.1665C1.6665 16.4677 3.53198 18.3332 5.83317 18.3332H14.1665C16.4677 18.3332 18.3332 16.4677 18.3332 14.1665V5.83317C18.3332 3.53198 16.4677 1.6665 14.1665 1.6665Z" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.3333 9.47476C13.4361 10.1683 13.3176 10.8766 12.9947 11.4989C12.6718 12.1213 12.1609 12.6259 11.5346 12.9412C10.9083 13.2564 10.1986 13.3661 9.50641 13.2547C8.81419 13.1433 8.17472 12.8165 7.67895 12.3207C7.18318 11.825 6.85636 11.1855 6.74497 10.4933C6.63359 9.80106 6.74331 9.09134 7.05852 8.46507C7.37374 7.83881 7.87841 7.32788 8.50074 7.00496C9.12307 6.68205 9.83138 6.56359 10.5249 6.66643C11.2324 6.77133 11.8873 7.10098 12.393 7.60669C12.8987 8.11239 13.2283 8.76733 13.3333 9.47476Z" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5835 5.4165H14.5918" stroke="#1A73E8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

const ChannelCard: FC<ChannelCardProps> = ({ channel }) => {
    const { key, name, status, lastConnected } = channel;
    const [showConfig, setShowConfig] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const configRef = useRef<HTMLDivElement>(null);

    // Close modal on outside click or Esc
    useEffect(() => {
        if (!showConfig) return;
        function handleClick(e: MouseEvent) {
            if (configRef.current && !configRef.current.contains(e.target as Node)) {
                setShowConfig(false);
            }
        }
        function handleEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') setShowConfig(false);
        }
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [showConfig]);

    return (
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 relative min-h-[170px] transition-all duration-500">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                    {channelIcons[key] || <span className="text-2xl">🔗</span>}
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-900">{name}</span>
                    <div className="flex items-center gap-2 mt-1">
                        {status === 'connected' ? (
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Connected</span>
                        ) : (
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">Not Connected</span>
                        )}
                    </div>
                </div>
                <button
                    className={`ml-auto rounded-full p-2 hover:bg-gray-100 focus:outline-none transition-transform ${expanded ? 'rotate-180' : ''}`}
                    aria-label="Show more options"
                    onClick={() => setExpanded((prev) => !prev)}
                >
                    <ChevronDownIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
                {status === 'connected' && lastConnected ? (
                    <>
                        <span className="text-green-500">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99984 12.8332C10.2215 12.8332 12.8332 10.2215 12.8332 6.99984C12.8332 3.77818 10.2215 1.1665 6.99984 1.1665C3.77818 1.1665 1.1665 3.77818 1.1665 6.99984C1.1665 10.2215 3.77818 12.8332 6.99984 12.8332Z" stroke="#22C55E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.25 7.00016L6.41667 8.16683L8.75 5.8335" stroke="#22C55E" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        Last connected: {format(new Date(lastConnected), 'M/d/yyyy h:mm:ss a')}
                    </>
                ) : (
                    <>
                        <span className="text-gray-400">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99984 12.8332C10.2215 12.8332 12.8332 10.2215 12.8332 6.99984C12.8332 3.77818 10.2215 1.1665 6.99984 1.1665C3.77818 1.1665 1.1665 3.77818 1.1665 6.99984C1.1665 10.2215 3.77818 12.8332 6.99984 12.8332Z" stroke="#9CA3AF" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.75 5.25L5.25 8.75" stroke="#9CA3AF" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.25 5.25L8.75 8.75" stroke="#9CA3AF" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        Not currently connected
                    </>
                )}
            </div>
            <div className="mt-4 flex items-center justify-between">
                <button
                    className="text-sm font-medium text-primary hover:underline focus:outline-none"
                    aria-label={`Open configuration settings for ${name}`}
                    onClick={() => setShowConfig(true)}
                >
                    Configuration Settings
                </button>
            </div>
            {/* Accordion expanded content */}
            <div
                className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                aria-hidden={!expanded}
            >
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-gray-700 text-sm">
                    More settings and info here...
                </div>
            </div>
            {/* Config Modal/Dropdown */}
            {showConfig && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" role="dialog" aria-modal="true">
                    <div ref={configRef} className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative outline-none">
                        <button
                            onClick={() => setShowConfig(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Close configuration modal"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold mb-4">{name} Configuration</h2>
                        <div className="text-gray-600 text-sm mb-4">(Settings UI coming soon...)</div>
                        <button
                            onClick={() => setShowConfig(false)}
                            className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChannelCard; 