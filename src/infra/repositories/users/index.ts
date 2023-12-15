import toEntity from './transform';

export default ({ model }: any) => {
  const findOne = async ({ id }: { id: number }): Promise<unknown | null> => {
    try {
      const data = await model.findByPk(id, { raw: true });
      console.log('findByPk', data);
      if (!data) return null;
      return toEntity({ ...data });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  };

  return {
    findOne,
  };
};
