export var allLevels = [
    {
        "level": 1,
        "target-moves": 3,
        "positions": {
            "man": [2, 3],
            "boxes": [[2, 2], [3, 2]],
            "target": [[2, 2], [3, 1]
            ],
        },
        "grid": [
            [2, 1, 1, 1, 2],
            [2, 1, 0, 1, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ]
    }
];

// 0 - safe, 1 - wall, 2 - empty