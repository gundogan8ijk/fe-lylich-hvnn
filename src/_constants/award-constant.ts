import { ArticleContributorRoleName } from "./article-constant";

export type AwardLevelDisplayName = 'Cấp Trường' | 'Cấp Tỉnh' | 'Cấp Quốc gia' | 'Cấp Quốc tế';
export type AwardLevelName = 'School' | 'Provincial' | 'National' | 'International';

export const AWARD_LEVEL_OPTIONS: { value: AwardLevelName; label: AwardLevelDisplayName }[] = [
    { value: 'School', label: 'Cấp Trường' },
    { value: 'Provincial', label: 'Cấp Tỉnh' },
    { value: 'National', label: 'Cấp Quốc gia' },
    { value: 'International', label: 'Cấp Quốc tế' },
];

