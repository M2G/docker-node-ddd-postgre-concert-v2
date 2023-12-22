import toEntity from './transform';

export default ({ model }) => {
  async function findOne({ id }: { id: number }): Promise<unknown | null> {
    try {
      const data = await model.findByPk(id, { raw: true });
      if (!data) return null;
      return toEntity({ ...data });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  return {
    findOne,
  };
};
