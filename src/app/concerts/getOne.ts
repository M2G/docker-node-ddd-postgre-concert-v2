import Concerts from 'domain/concerts';
import type IConcertsRepository from 'types/IConcertsRepository';

/**
 * function for get one concert.
 */
export default ({
  concertsRepository,
  logger,
}: {
  concertsRepository: IConcertsRepository;
  logger: any;
}) => {
  const getOne = ({ id }: { readonly id: number }) => {
    try {
      const concert = Concerts({ id });
      return concertsRepository.findOne(concert);
    } catch (error: unknown) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    getOne,
  };
};
