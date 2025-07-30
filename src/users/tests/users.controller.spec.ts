import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  //test1
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //test2
  describe('getAllRoles', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, email: 'admin@mail.com' },
        { id: 2, email: 'user@mail.com' }
      ];
      mockUsersService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.getAllRoles();

      expect(result).toEqual(mockUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });
});
