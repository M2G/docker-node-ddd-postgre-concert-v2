import type IConcert from 'core/concerts';

interface IConcertsRepository {
  findOne: (id: unknown) => IConcert;
  getAll: (arg: {
    filters: string;
    pageSize: number;
    page: number;
    attributes: any;
  }) => IConcert;
}

export default IConcertsRepository;
