const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'play volleyball' },
        'task-2': { id: 'task-2', content: 'learn react' },
        'task-3': { id: 'task-3', content: 'work' },
        'task-4': { id: 'task-4', content: 'watch the walking dead show' },
        'task-4': { id: 'task-5', content: 'default' },
        'task-5': { id: 'task-6', content: 'drink coke' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6'],
        },
        'column-2': {
            id: 'column-2',
            title: 'Doing',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;