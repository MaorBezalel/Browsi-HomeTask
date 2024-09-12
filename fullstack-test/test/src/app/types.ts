export type Publisher = {
    publisher: string;
    domains: Array<Domain>;
};

export type Domain = {
    url: string;
    desktopAds: number;
    mobileAds: number;
};

export type BackEndError = {
    error: {
        errorMessage: string;
    };
};
