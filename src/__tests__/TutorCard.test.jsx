import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import TutorCard from '../components/TutorCard';

vi.mock('../components/RatingStars', () => ({
  default: vi.fn(() => <div data-testid="rating-stars" />),
}));

import RatingStars from '../components/RatingStars';

describe('TutorCard', () => {
  it('не перемальовується, якщо пропси не змінилися', () => {
    const mockTutor = {
      id: 1,
      name: 'Тестовий Репетитор',
      city: 'Київ',
      subjects: ['Математика'],
      reviews: [{ id: 1, rating: 5, date: '2026-01-01', author: 'Анонім' }],
      pricePerHour: 500,
      format: 'online',
      experienceYears: 5,
      photo: '/photo.png',
      bio: 'Досвідчений викладач.',
      languages: ['українська'],
      joined: '2020-01-01',
    };

    const props = {
      tutor: mockTutor,
      isFavorite: false,
      isSelected: false,
      onSelect: vi.fn(),
      onToggleFavorite: vi.fn(),
    };

    const { rerender } = render(<TutorCard {...props} />);

    expect(RatingStars).toHaveBeenCalledTimes(1);

    rerender(<TutorCard {...props} />);

    expect(RatingStars).toHaveBeenCalledTimes(1);
  });
});