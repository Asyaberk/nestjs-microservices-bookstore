import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from '../controllers/roles.controller';
import { RolesService } from '../services/roles.service';

describe('RolesController', () => {
  let controller: RolesController;

  const mockRolesService = {
    findAll: jest.fn(),
    create: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        { provide: RolesService, useValue: mockRolesService }
      ]
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  //test1
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //test2
  describe('createRole', () => {

    //test2.1
    it('can create a new role', async () => {
      const mockRole = { id: 1, name: 'Admin' };
      mockRolesService.create.mockResolvedValue(mockRole);

      const result = await controller.createRole({ name: 'Admin' });

      expect(result).toEqual(mockRole);
      expect(mockRolesService.create).toHaveBeenCalledWith({ name: 'Admin' });
    });

    //test2.2
    it('can throw error if role already exists', async () => {
      mockRolesService.create.mockRejectedValue(new Error('Role already exists!'));

      await expect(controller.createRole({ name: 'Admin' }))
        .rejects.toThrow('Role already exists!');
    });
  });

  //test3
  describe('getAllRoles', () => {
    it('should return all roles', async () => {
      const mockRoles = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'User' }
      ];
      mockRolesService.findAll.mockResolvedValue(mockRoles);

      const result = await controller.getAllRoles();

      expect(result).toEqual(mockRoles);
      expect(mockRolesService.findAll).toHaveBeenCalled();
    });
  });
});
