import { matchesQuery } from './text';
import { tutorScore } from './rating';

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Рекомендовані' },
  { value: 'price-asc', label: 'Спочатку дешевші' },
  { value: 'price-desc', label: 'Спочатку дорожчі' },
  { value: 'experience', label: 'За досвідом' },
  { value: 'name', label: 'За іменем' },
];

const comparators = {
  'price-asc': (a, b) => a.pricePerHour - b.pricePerHour,
  'price-desc': (a, b) => b.pricePerHour - a.pricePerHour,
  experience: (a, b) => b.experienceYears - a.experienceYears,
  name: (a, b) => a.lastName.localeCompare(b.lastName, 'uk'),
};

export function applyFilters(list, filters) {
  return list.filter((tutor) => {
    if (filters.subjects.length && !filters.subjects.some((s) => tutor.subjects.includes(s))) {
      return false;
    }
    if (filters.city && tutor.city !== filters.city) return false;
    if (filters.format !== 'all' && tutor.format !== filters.format && tutor.format !== 'both') {
      return false;
    }
    if (tutor.pricePerHour > filters.maxPrice) return false;
    if (filters.verifiedOnly && !tutor.verified) return false;
    return true;
  });
}

export function getVisibleTutors(list, { query, filters, sortBy }) {
  const filtered = applyFilters(list, filters).filter((tutor) => matchesQuery(tutor, query));

  if (!comparators[sortBy]) {
    return filtered
      .map((tutor) => ({ tutor, score: tutorScore(tutor) }))
      .sort((a, b) => b.score - a.score)
      .map((item) => item.tutor);
  }

  return filtered.sort(comparators[sortBy]);
}