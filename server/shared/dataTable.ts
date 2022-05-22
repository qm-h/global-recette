export enum DataTableType {
    RECETTE = 'recette',
    INGREDIENTS = 'ingredients',
    FULL_RECETTE = 'full_recette',
    USER = 'user',
}

export const dataTable = (dataTable: DataTableType) => dataTable.toString()
