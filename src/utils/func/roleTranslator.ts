export function RoleTranslator(Role: number) {
    switch (Role) {
        case 1:
            return 'Владелец';
        case 2:
            return 'Администратор';
        case 3:
            return 'Участник+';
        case 4:
            return 'Участник';
        case 5:
            return 'Читатель';

        default:
            return "Импостер";
    }
}
