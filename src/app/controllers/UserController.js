const UserRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await UserRepository.findAll(orderBy);

    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  async store(request, response) {
    const {
      name, email, phone, cpf, birthDate, genre
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'This e-mail is alredy in use' });
    }

    const user = await UserRepository.create({
      name, email, phone, cpf, birthDate, genre
    });

    response.status(201).json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await UserRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await UserRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is alredy in use' });
    }

    const contact = await UserRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await UserRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new UserController();
