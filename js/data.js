const data  = [
    {
    brand:"Samsung",
    title: "Samsung Galaxy Z Flip4",
    storage: [
        {0: ["128 GB",20990000]},
        {1:["256 GB",22990000]},
        {2: ["512 GB",24990000]}
    ],
    colors: ["Bora Purple","Graphite","Pink Gold","Blue"],
    display_size: "6.7\"",
    diplay_type: "FHD+ Foldable Dynamic AMOLED 2X",
    front_camera: "10MP",
    rear_camera: ["12 MP, f/1.8, 24mm (wide)","12 MP, f/2.2, 123˚ (ultrawide)"],
    OS: "Android 12",
    GPU: "Adreno 730",
    chipset: "Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)",
    CPU: "Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)", 
    battery:"3700mAh",
    rating: 4,
    image: ["image/samsung1.jpg","image/samsung2.jpg","image/samsung3.jpg","image/samsung4.jpg"]
    },
    {
        brand:"Samsung",
        title:"Galaxy S22 Ultra 5G",
        storage: [
            {0: ["128 GB",30990000]},
            {1:["256 GB",33990000]},
            {2: ["512 GB",36990000]}
        ],
        colors: ["Graphite","Red","Sky Blue"],
        display_size: "6.8\"",
        diplay_type: "Dynamic AMOLED 2X, 120Hz, HDR10+, 1750 nits (peak)",
        front_camera: "40MP",
        rear_camera: ["108 MP, f/1.8, 23mm (wide)","10 MP, f/4.9, 230mm (periscope telephoto)","10 MP, f/2.4, 70mm (telephoto), 1/3.52\"","12 MP, f/2.2, 13mm, 120˚ (ultrawide)"],
        OS: "Android 12",
        GPU: "Adreno 730",
        chipset: "Exynos 2200 (4 nm) - Europe",
        CPU: "Octa-core (1x2.8 GHz Cortex-X2 & 3x2.50 GHz Cortex-A710 & 4x1.8 GHz Cortex-A510) - Europe", 
        battery:"5000 mAh",
        rating: 5,
        image:[]
    },
    {
        brand:"Samsung",
        title:"Samsung Galaxy A23",
        storage: [
            {0: ["4 GB",5690000]},
            {1:["6 GB",6190000]}
        ],
        colors: ["Black","White","Blue","Peach"],
        display_size: "6.6\"",
        diplay_type: "PLS LCD, 120Hz",
        front_camera: "8 MP",
        rear_camera: ["50 MP, f/1.8, (wide), PDAF, OIS","5 MP, f/2.2, 123˚ (ultrawide), 1/5\", 1.12µm","2 MP, f/2.4, (macro)","2 MP, f/2.4, (depth)"],
        OS: "Android 12",
        GPU: "Adreno 619",
        chipset: "Exynos 2200 (4 nm) - Europe",
        CPU: "Octa-core (2x2.2 GHz Kryo 660 Gold & 6x1.7 GHz Kryo 660 Silver)", 
        battery:"5000 mAh",
        rating: 4,
        image:[]
    },
    {
        brand:"Samsung",
        title:"Samsung Galaxy Z Fold4",
        storage: [
            {0: ["256 GB",37990000]},
            {1:["512 GB",41490000]}
        ],
        colors: ["Black","Graygreen","Beige"],
        display_size: "7.6\"",
        diplay_type: "Foldable Dynamic AMOLED 2X, 120Hz, HDR10+, 1200 nits (peak)",
        front_camera: "10 MP",
        rear_camera: ["50 MP, f/1.8, 23mm (wide), 1.0µm, Dual Pixel PDAF, OIS","10 MP, f/2.4, 66mm (telephoto), 1.0µm, PDAF, OIS, 3x optical zoom","12 MP, f/2.2, 123˚, 12mm (ultrawide), 1.12µm"],
        OS: "Android 12",
        GPU: "Adreno 730",
        chipset: "Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)",
        CPU: "Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)", 
        battery:"4400 mAh",
        rating: 4,
        image:[]
    },
    {
        brand:"Samsung",
        title:"Samsung Galaxy S22+ 5G",
        storage: [
            {0: ["128 GB",25990000]},
            {1:["256 GB",27490000]}
        ],
        colors: ["White","Green","Graphite","Violet"],
        display_size: "6.6\"",
        diplay_type: "Dynamic AMOLED 2X, 120Hz, HDR10+, 1750 nits (peak)",
        front_camera: "10 MP",
        rear_camera: ["50 MP, f/1.8, 23mm (wide), 1/1.56\", 1.0µm, Dual Pixel PDAF, OIS","10 MP, f/2.4, 70mm (telephoto), 1/3.94\", 1.0µm, PDAF, OIS, 3x optical zoom"," 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\" 1.4µm, Super Steady video"],
        OS: "Android 12",
        GPU: "Adreno 730",
        chipset: "Qualcomm SM8450 Snapdragon 8 Gen 1 (4 nm)",
        CPU: "Octa-core (1x3.00 GHz Cortex-X2 & 3x2.50 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)", 
        battery:"4500 mAh",
        rating: 4,
        image:[]
    },{
        brand:"Samsung",
        title:"Samsung Galaxy A73",
        storage: [
            {0: ["128 GB",11990000]}
        ],
        colors: ["Gray","Mint","White"],
        display_size: "6.7\"",
        diplay_type: "Super AMOLED Plus, 120Hz, 800 nits (HBM)",
        front_camera: "32 MP",
        rear_camera: ["108 MP, f/1.8, (wide), PDAF, OIS","12 MP, f/2.2, (ultrawide)"," 5 MP, f/2.4, (macro)","5 MP, f/2.4, (depth)"],
        OS: "Android 12",
        GPU: "Adreno 642L",
        chipset: "Qualcomm SM7325 Snapdragon 778G 5G (6 nm)",
        CPU: "Octa-core (1x2.4 GHz Cortex-A78 & 3x2.2 GHz Cortex-A78 & 4x1.9 GHz Cortex-A55)", 
        battery:"5000 mAh",
        rating: 4,
        image:[]
    },{
        brand:"Samsung",
        title:"Samsung Galaxy A32",
        storage: [
            {0: ["128 GB",5490000]}
        ],
        colors: ["Purple","Blue"],
        display_size: "6.4\"",
        diplay_type: "Super AMOLED, 90Hz, 800 nits (HBM)",
        front_camera: "20 MP",
        rear_camera: ["64 MP, f/1.8, 26mm (wide), PDAF","8 MP, f/2.2, 123˚, (ultrawide), 1/4.0\", 1.12µm"," 5 MP, f/2.4, (macro)","5 MP, f/2.4, (depth)"],
        OS: "Android 11",
        GPU: "Mali-G52 MC2",
        chipset: "Mediatek MT6769V/CU Helio G80 (12 nm)",
        CPU: "Octa-core (2x2.0 GHz Cortex-A75 & 6x1.8 GHz Cortex-A55)", 
        battery:"5000 mAh",
        rating: 3,
        image:[]
    },{
        brand:"Samsung",
        title:"Samsung Galaxy M53",
        storage: [
            {0: ["256 GB",12490000]}
        ],
        colors: ["Green","Blue","Brown"],
        display_size: "6.7\"",
        diplay_type: "Super AMOLED Plus, 120Hz",
        front_camera: "32 MP",
        rear_camera: ["108 MP, f/1.8, (wide), PDAF","8 MP, f/2.2, (ultrawide), 1/4\", 1.12µm","2 MP, f/2.4, (depth)","2 MP, f/2.4, (macro)"],
        OS: "Android 12",
        GPU: "Mali-G68 MC4",
        chipset: "MediaTek MT6877 Dimensity 900 (6 nm)",
        CPU: "Octa-core (2x2.4 GHz Cortex-A78 & 6x2.0 GHz Cortex-A55)", 
        battery:"5000 mAh",
        rating: 4,
        image:[]
    },{
        brand:"Samsung",
        title:"Samsung Galaxy A03s",
        storage: [
            {0: ["64 GB",3690000]}
        ],
        colors: ["Black","Blue","White"],
        display_size: "6.5\"",
        diplay_type: "Super AMOLED Plus, 120Hz",
        front_camera: "5 MP",
        rear_camera: ["13 MP, f/2.2, (wide), AF","2 MP, f/2.4, (macro)","2 MP, f/2.4, (depth)","2 MP, f/2.4, (depth)"],
        OS: "Android 11",
        GPU: "PowerVR GE8320",
        chipset: "MediaTek MT6765 Helio P35 (12nm)",
        CPU: "Octa-core (4x2.35 GHz Cortex-A53 & 4x1.8 GHz Cortex-A53)", 
        battery:"5000 mAh",
        rating: 4,
        image:[]
    },{
        brand:"Samsung",
        title:"Samsung Galaxy M33",
        storage: [
            {0: ["128 GB",7690000]}
        ],
        colors: ["Green","Blue","Brown"],
        diplay_size: "6.6\"",
        diplay_type: "TFT LCD, 120Hz",
        selfie_camera: "8 MP",
        main_camera: ["50 MP, f/1.8, (wide), PDAF","5 MP, f/2.2, 123˚ (ultrawide)","2 MP, f/2.4, (depth)","2 MP, f/2.4, (macro)"],
        OS: "Android 12",
        GPU: "Mali-G68",
        chipset: "MediaTek MT6765 Helio P35 (12nm)",
        CPU: "Octa-core (2x2.4 GHz Cortex-A78 & 6x2.0 GHz Cortex-A55)", 
        battery:"5000 mAh",
        rating: 4,
        image:[]
    }
]